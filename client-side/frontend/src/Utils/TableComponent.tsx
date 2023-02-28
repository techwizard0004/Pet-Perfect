import React from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListOutputModel from '../Models/ListOutputModel';

export const TableComponent = (props: { tableContent: ListOutputModel }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        props.tableContent.headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))
                    }
                    <th>View Data</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.tableContent.dataList.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                row.map((cell: string | number, cellIndex: React.Key | string | number) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))
                            }
                            <td><button onClick={() => props.tableContent.redirectCallbackMethod(row[0] as number)}><FontAwesomeIcon icon={faEye} /></button></td>
                        </tr>
                    ))
                }


            </tbody>
        </table>


    )
}