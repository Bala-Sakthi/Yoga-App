import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { FaSort } from 'react-icons/fa';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons/lib';
import './FilterComponent.css';
import { useTheme } from '../Contexts/ThemeContext';

const BasicTable = (props) => {
  const { color } = useTheme();
  const columns = useMemo(() => props.COLUMNS, [props.COLUMNS]);
  const data = useMemo(() => props.MOCK_DATA || [], [props.MOCK_DATA]);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        autoResetWidth: false,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

  return (
    <div>
      <Container fluid className="ml-xxl-n4 ml-xl-n4 ml-lg-n4">
        <Row>
          <Table
            className="justify-content-center align-items-center"
            hover
            {...getTableProps()}
            responsive={true}
            style={{ width: '100%', marginLeft: '25px', backgroundColor: 'white' }}
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps()}
                      key={index}
                      className="text-center text-dark"
                      style={{
                        width: `${column.width}px`,
                        whiteSpace: 'nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#d3d3d3', // Grey header background
                        border: 'none', // Remove borders from headers
                      }}
                      onClick={(e) => {
                        if (
                          !e.target.classList.contains('fa-sort') &&
                          column.render('Header') !== 'ACTIONS'
                        ) {
                          column.toggleSortBy(!column.isSortedDesc);
                        }
                      }}
                    >
                      {column.render('Header') === 'ACTIONS' ? (
                        <>{column.render('Header')}</>
                      ) : (
                        <div>
                          {column.render('Header')}
                          <FaSort className="mx-2" />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length > 0 ? (
                page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, cellIndex) => {
                        const isActionColumn =
                          cell.column.id === 'action' ||
                          cell.column.id === 'localShop' ||
                          cell.column.id === 'serviceCenter' ||
                          cell.column.id === 'ourServices' ||
                          cell.column.id === 'addInCarousel';
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={cellIndex}
                            className="text-secondary text-start"
                            style={{
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              maxWidth: '20ch',
                              backgroundColor: 'white', // White row background
                              border: 'none', // Remove borders from cells
                            }}
                          >
                            {isActionColumn
                              ? cell.render('Cell')
                              : cell.value
                              ? cell.render('Cell')
                              : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-dark"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default BasicTable;
