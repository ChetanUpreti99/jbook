
import { Fragment, useEffect } from 'react';

import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import { useActions } from '../hooks/use-actions';


import './CellList.css';

const CellList: React.FC = () => {


    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id])
    );

    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
    }, [])

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div className="cell-list">
            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            {renderedCells}
        </div>
    );
};

export default CellList;
