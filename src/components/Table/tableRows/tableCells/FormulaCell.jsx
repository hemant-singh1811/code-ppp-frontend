import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../tableComponents/TableComponents';

const FormulaCell = ({cell,rowData}) => {
    const [value,setValue] = useState(rowData || "");
    //const formula = cell.column.ColumnDef.options.formula;
    const formula = "Num1 + Num2";
    const {columns,data } = useContext(TableContext);
    const myMap = new Map();
    columns.forEach((column)=>{
      if(column.fieldName){
        myMap.set(column.fieldName,cell.row.getValue(column.fieldId));
      }
    })
    const myString = Array.from(myMap.keys()).join('|');
    console.log(myMap)
    
    const regexPattern = new RegExp(`(${myString})`, 'g');
    const formulaArray = formula.split(regexPattern);
    const formulaArray2 = formulaArray.map((item)=>{
      if(myMap.has(item)){
        return myMap.get(item);
      }
      return item;
    })
    const formulaString = formulaArray2.join('');
    console.log(eval(formulaString))
    useEffect(()=>{
      setValue(eval(formulaString))
    },[data])
  return (
    <div>
        <input type='text' value={value} onChange={(e)=>setValue(e.target.value)} />
    </div>
  )
}

export default FormulaCell;