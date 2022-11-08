// icons
import { FingerPrintIcon, ClockIcon, UserIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
// hooks
import { useEffect, useState } from 'react';
// components
import { SortBarItem } from '../components/SortBar/SortBar';
import SortBar from '../components/SortBar/SortBar';
import List from '../components/List';
import Form from '../components/Form';
import LayoutSwitcher from '../components/LayoutSwitcher';




const DEFAULT_SORT_STATE = Object.freeze({
  key: 'id',
  direction: 'asc',
});


const addLocalStorageItems = (list) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('list', JSON.stringify(list));
  }
}

const sortMethods = (key) => {
  if (key === 'id') {
    return (a, b) => a[key] - b[key];
  } else if (key === 'name') {
    return (a, b) => a[key].localeCompare(b[key]);
  } else if (key === 'date') {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  }
  return;
}

const getLocalStorageItems = (storageItem) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem(storageItem) !== null) {
      return JSON.parse(localStorage.getItem(storageItem));
    }
  }
  return false;
}

const Home = ({ data }) => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  // const [list, setList] = useState(getLocalStorageItems('list') ? getLocalStorageItems('list') : []);
  const [layout, setLayout] = useState('list');
  const [sortState, setSortState] = useState(DEFAULT_SORT_STATE);


  const handleItemAdd = () => {
    setList(
      [...list,
      {
        id: [...list].length === 0 ? 1 : Math.max(...list.map(item => item.id)) + 1,
        name: value,
        best: false,
        date: new Date().toUTCString(),
      }]
    );
    setValue('');
  }


  const handleItemRemove = (i) => {
    setList([...list].filter((item) => item !== list[i]));
  }

  const handleToggleBest = (list, item) => {
    const newState = [...list].map((listItem) => {
      if (listItem.id === item.id) {
        return { ...listItem, best: !listItem.best }
      } else {
        return listItem;
      }
    })
    setList(newState);
  }

  const handleLayoutToggle = (item) => setLayout(item);
  const handleInputChange = (item) => setValue(item);

  useEffect(() => {
    setList(prevState => sortState.direction === 'asc' ? [...prevState].sort(sortMethods(sortState.key)) : [...prevState].sort(sortMethods(sortState.key)).reverse());
  }, [sortState, value]);

  useEffect(() => {
    addLocalStorageItems(list);
  }, [list])

  return (
    <div className="bg-teal-900 min-h-screen">
      <div className='container mx-auto py-14 px-6'>
        {data !== undefined && (
          <div className='text-right'>
            <div className='bg-teal-800 p-4 text-white rounded-xl hidden md:inline-block mb-5 ml-auto mr-0 min-h-fit'>
              <h4 className={'text-white text-s font-bold'}>Daily joke</h4>
              <p className={'text-xs'}>{data.value}</p>
            </div>
          </div>
        )}
        <h1 className='text-5xl font-extrabold text-white mb-5'>FavMusicList</h1>
        <div className='flex flex-wrap items-start gap-6'>
          <div className='bg-teal-100 rounded-xl shadow-xl inline-block pb-8'>
            <h2 className='text-teal-300 font-bold text-xl p-6 bg-slate-900 rounded-t-xl'>Create entry</h2>
            <Form value={value} itemAdd={() => handleItemAdd()} onChange={(item) => handleInputChange(item)}></Form>
          </div>
          {list.length !== 0 &&
            <div className='bg-teal-100 rounded-xl shadow-xl pb-8 inline-block flex-1 min-w-fit'>
              <div className='p-6 bg-slate-900 rounded-t-xl w-full flex flex-wrap justify-between items-center'>
                <h2 className='text-teal-300 font-bold text-xl mb-3 md:mb-0'>Your list</h2>
                <div className='flex flex-wrap gap-3 items-center'>

                  <SortBar groupLabel="Sort type group" state={sortState.key} onClick={(e) => setSortState({ ...sortState, key: e.target.getAttribute('name') })}>
                    <SortBarItem name={'id'}>
                      <FingerPrintIcon className='btn-sort-icon'></FingerPrintIcon>
                    </SortBarItem>
                    <SortBarItem name={'name'}>
                      <UserIcon className='btn-sort-icon'></UserIcon>
                    </SortBarItem>
                    <SortBarItem name={'date'}>
                      <ClockIcon className='btn-sort-icon'></ClockIcon>
                    </SortBarItem>
                  </SortBar>

                  <SortBar groupLabel="Sort direction group" state={sortState.direction} onClick={(e) => setSortState({ ...sortState, direction: e.target.getAttribute('name') })}>
                    <SortBarItem name={'asc'}>
                      <ArrowUpIcon className='btn-sort-icon'></ArrowUpIcon>
                    </SortBarItem>
                    <SortBarItem name={'desc'}>
                      <ArrowDownIcon className='btn-sort-icon'></ArrowDownIcon>
                    </SortBarItem>
                  </SortBar>

                  <LayoutSwitcher layout={layout} layoutToggle={(item) => handleLayoutToggle(item)}></LayoutSwitcher>

                </div>
              </div>
              <div className={`pl-3 pr-3 md:pr-0 md:pl-8`}>
                <List list={list} layout={layout} removeItem={(itemIndex) => handleItemRemove(itemIndex)} toggleBest={(list, item) => handleToggleBest(list, item)}></List>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;


export async function getServerSideProps() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Key': 'da5f1f76b6msh86571c74ba9463bp196a4bjsn03f4d0a331c5',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    },
  };

  const res = await fetch('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', options);
  const data = await res.json();

  return {
    props: { data }
  }
}