import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, redirect } from 'react-router-dom';
import {
  handelAddBases,
  handelAddTableInBases,
  handelRenameBases,
  handelRenameTableInBases,
} from '../../../store/features/BasesStateSlice';
import {
  handelSelectedTableAndBaseId,
  handleAddToggle,
} from '../../../store/features/globalStateSlice';
import {
  handelAddSideBarField,
  handelAddSideBarMenu,
  handelRenameSideBarField,
  handelRenameSideBarMenu,
} from '../../../store/features/SideBarStateSlice';
import {
  useCreateBaseMutation,
  useCreateTableMutation,
  useRenameBaseMutation,
  useRenameTableMutation,
} from '../../../store/services/alphaTruckingApi';
import LoadingAlt from '../../utilities/LoadingAlt';

export default function AddTable() {
  const [createTableApi, responseCreateTable] = useCreateTableMutation();
  const [createBaseApi, responseCreateBase] = useCreateBaseMutation();
  const [renameTableApi, responseRenameTable] = useRenameTableMutation();
  const [renameBaseApi, responseRenameBase] = useRenameBaseMutation();

  const { selectedBaseId } = useSelector((state) => state.globalState);
  const { bases } = useSelector((state) => state.bases);
  const { sidebar } = useSelector((state) => state.sidebar);
  const { isOpen, type, action, name, baseId, tableId } = useSelector(
    (state) => state.globalState.addToggle
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState(name || '');
  const [isExistNameInput, setIsExistNameInput] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');

  // useEffect(() => {
  //   setNameInput(name);
  //   setDescriptionInput(name);
  // }, [baseId || tableId]);

  useEffect(() => {
    setNameInput(name || '');
    // setDescriptionInput(name || '');
  }, [baseId]);

  useEffect(() => {
    setNameInput(name || '');
    // setDescriptionInput(name || '');
  }, [tableId]);

  // save all the table names and later check if the name is already present or not
  const existingTable = new Set();

  // save all the bases names and later check if the name is already present or not
  const existingBases = new Set();
  // useEffect(() => {
  bases.map(({ baseid, tablemetadata }) => {
    if (baseid === selectedBaseId) {
      tablemetadata?.forEach(({ table_name }) => {
        console.log(
          'updating map f================================================================'
        );
        existingTable.add(table_name?.toLocaleLowerCase());
      });
    }
  });
  console.log('fdsafsd fdaf dafd');

  bases.map(({ basemetadata }) => {
    existingBases.add(basemetadata.name);
  });
  // }, []);

  existingTable.forEach((key) => {
    console.log('Existing table name', key);
  });
  console.log('fdsafads');

  useEffect(() => {
    if (responseCreateTable?.data) {
      console.log('create Table:', responseCreateTable?.data);
      dispatch(
        handelAddTableInBases({
          baseId: selectedBaseId,
          data: responseCreateTable?.data,
        })
      );
      dispatch(
        handelAddSideBarField({
          baseId: selectedBaseId,
          data: {
            title: responseCreateTable?.data?.table_name,
            tableId: responseCreateTable?.data?.table_id,
            to: `${selectedBaseId}/${responseCreateTable?.data?.table_id}`,
            baseId: selectedBaseId,
          },
        })
      );
      dispatch(
        handelSelectedTableAndBaseId({
          selectedTableId: responseCreateTable?.data?.table_id,
        })
      );
      dispatch(handleAddToggle({ isOpen: false, type: '' }));
      setNameInput('');
      setDescriptionInput('');
      navigate(`/${selectedBaseId}/${responseCreateTable?.data?.table_id}`);
    }
  }, [responseCreateTable.isSuccess]);

  useEffect(() => {
    if (responseCreateBase?.data) {
      console.log('create Base:', responseCreateBase?.data);
      dispatch(handelAddBases([...bases, responseCreateBase?.data]));
      dispatch(
        handelAddSideBarMenu([
          ...sidebar,
          {
            subMenu: [],
            baseId: responseCreateBase?.data.baseid,
            title: responseCreateBase?.data.basemetadata.name,
            icons: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 96 960 960'
                width='24'>
                <path d='M160 896V256h640v640H160Zm40-433.846h560V296H200v166.154Zm199.923 196.923h160.154V502.154H399.923v156.923Zm0 196.923h160.154V699.077H399.923V856ZM200 659.077h159.923V502.154H200v156.923Zm400.077 0H760V502.154H600.077v156.923ZM200 856h159.923V699.077H200V856Zm400.077 0H760V699.077H600.077V856Z' />
              </svg>
            ),
          },
        ])
      );
      dispatch(handleAddToggle({ isOpen: false, type: '' }));
      setNameInput('');
      setDescriptionInput('');
    }
  }, [responseCreateBase.isSuccess]);

  useEffect(() => {
    if (responseRenameTable?.data) {
      console.log('Rename Table:', responseRenameTable?.data);
      dispatch(
        handelRenameTableInBases({
          baseId: baseId,
          tableId: tableId,
          updatedName: nameInput.trim(),
        })
      );
      dispatch(
        handelRenameSideBarField({
          baseId: baseId,
          tableId: tableId,
          updatedName: nameInput.trim(),
        })
      );
      dispatch(handleAddToggle({ isOpen: false, type: '' }));
      setNameInput('');
      setDescriptionInput('');
    }
  }, [responseRenameTable.isSuccess]);

  useEffect(() => {
    if (responseRenameBase?.data) {
      console.log('Rename Base:', responseRenameBase?.data);
      dispatch(
        handelRenameBases({
          baseId: responseRenameBase?.data?.baseid,
          updatedName: responseRenameBase?.data?.base_name,
        })
      );
      dispatch(
        handelRenameSideBarMenu({
          baseId: responseRenameBase?.data?.baseid,
          updatedName: responseRenameBase?.data?.base_name,
        })
      );
      dispatch(handleAddToggle({ isOpen: false, type: '' }));
      setNameInput('');
      setDescriptionInput('');
    }
  }, [responseRenameBase.isSuccess]);

  // useEffect(() => {
  //   if (responseCreateTable?.error) {
  //     dispatch(
  //       handelOpenModal({
  //         heading: 'Table Creation',
  //         error: responseCreateTable?.error?.data?.err,
  //       })
  //     );
  //   }
  //   if (responseCreateBase?.error) {
  //     dispatch(
  //       handelOpenModal({
  //         heading: 'Base Creation',
  //         error: responseCreateBase?.error?.data?.err,
  //       })
  //     );
  //   }
  // }, [responseCreateTable.isError || responseCreateBase?.error]);

  return (
    <div className=''>
      {isOpen && (
        <div className='text-black absolute bottom-[10px] z-50  w-96 rounded-md left-[10px] bg-white p-4 border-gray-400 border-2 flex flex-col '>
          <input
            type='text'
            placeholder={
              type === 'table'
                ? 'Table Name (Mandatory)'
                : type === 'base'
                ? 'Base Name (Mandatory)'
                : ''
            }
            className='w-full p-1 px-2 border-2 rounded-md outline-blue-500 border-[#cccecf] mb-3'
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              switch (type) {
                case 'table':
                  existingTable.has(e.target.value.toLocaleLowerCase().trim())
                    ? setIsExistNameInput(true)
                    : setIsExistNameInput(false);

                  break;

                case 'base':
                  existingBases.has(e.target.value.toLocaleLowerCase().trim())
                    ? setIsExistNameInput(true)
                    : setIsExistNameInput(false);

                  break;

                default:
                  break;
              }
            }}
          />

          {isExistNameInput && (
            <div className='text-red-700 text-sm m-1 -mt-3 -mb-2'>
              Please enter a unique {type === 'table' ? 'Table' : 'Base'} name
            </div>
          )}

          <div className='mt-4'>
            <div className='mb-1'>Description</div>
            <input
              type='text'
              className='px-2 p-1 w-full outline-gray-400  bg-[#f2f2f2] rounded-md'
              placeholder={
                type === 'table'
                  ? 'Describe this Table (optional)'
                  : type === 'base'
                  ? 'Describe this Base (optional)'
                  : ''
              }
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>

          <div className='flex justify-between items-center mt-8'>
            <div>
              <div
                className={`flex items-center hover:text-black text-gray-600 cursor-pointer ${
                  isOpen && 'hidden'
                } `}
                onClick={() =>
                  dispatch(handleAddToggle({ isOpen: false, type: '' }))
                }>
                <span className='material-icons-round text-xl'>add</span>
                Add description
              </div>
            </div>
            <div className='flex items-center gap-2 select-none'>
              <div
                className='hover:bg-gray-200 p-1.5 rounded-md px-4 cursor-pointer'
                onClick={() => {
                  dispatch(handleAddToggle({ isOpen: false, type: '' }));
                  setNameInput('');
                }}>
                cancel
              </div>
              {
                <button
                  disabled={
                    !nameInput ||
                    isExistNameInput ||
                    responseCreateTable.isLoading
                  }
                  onClick={() => {
                    if (action === 'rename') {
                      switch (type) {
                        case 'table':
                          renameTableApi({
                            baseId: baseId,
                            data: {
                              table_id: tableId,
                              table_name: nameInput.trim(),
                              table_description: descriptionInput.trim(),
                            },
                          });
                          break;
                        case 'base':
                          renameBaseApi({
                            data: {
                              baseid: baseId,
                              base_name: nameInput.trim(),
                              base_description: descriptionInput.trim(),
                            },
                          });
                          break;
                        default:
                          break;
                      }
                    } else {
                      switch (type) {
                        case 'table':
                          createTableApi({
                            baseId: selectedBaseId,
                            data: {
                              table_name: nameInput.trim(),
                              table_description: descriptionInput.trim(),
                            },
                          });
                          break;
                        case 'base':
                          createBaseApi({
                            data: {
                              base_name: nameInput.trim(),
                              base_description: descriptionInput.trim(),
                            },
                          });
                          break;
                        default:
                          break;
                      }
                    }
                  }}
                  className='bg-blue-600 rounded-md p-1.5 px-4 min-w-[105px] min-h-[31.5px] text-white cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center'>
                  {responseCreateTable.isLoading ||
                  responseCreateBase.isLoading ||
                  responseRenameTable.isLoading ||
                  responseRenameBase.isLoading ? (
                    <div>
                      <LoadingAlt />
                    </div>
                  ) : (
                    <span className='capitalize'>
                      {action} {type === 'table' ? 'Table' : 'Base'}
                    </span>
                  )}
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
