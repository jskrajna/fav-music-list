import { Children, cloneElement } from "react";
import { nanoid } from 'nanoid';

export const SortBarItem = ({ name, children, className, state }) => {
    return (
        <button name={name} type="button" className={`${state === name ? 'active' : ''} ${className ? className : 'btn-sort'}`}>
            {children}
            {name}
        </button >
    );
};

const SortBar = ({ children, onClick, groupLabel, state }) => {
    const arrayChildren = Children.toArray(children);

    return (
        <div className="inline-flex shadow-sm" role="group" aria-label={groupLabel} onClick={(e) => onClick(e)}>
            {arrayChildren.map(el => {
                return cloneElement(el, { state: state, key: nanoid() })
            })}
        </div>
    );
};

export default SortBar;