import React, {useState} from "react";
// @ts-ignore
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (p: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize +  1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
            <div className={styles.numberOfPage}>
                {portionNumber > 1 &&
                <button className={styles.pag} onClick={() => {setPortionNumber(portionNumber - 1)}}>&#171;</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                    return <span className={ cn({[styles.selectedPage]: currentPage === p}, styles.page)} key={p} onClick={(e) => {onPageChange(p)
                    }}>{p}</span>
                })}
                    {portionCount > portionNumber &&
                        <button className={styles.pag} onClick={() => {setPortionNumber(portionNumber + 1)}}>&#187;</button>}
            </div>
    )
}

export default Paginator