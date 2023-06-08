import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../tableComponents/TableComponents';
import { set } from 'react-hook-form';

const FormulaCell = ({cell,rowData}) => {
    const [value,setValue] = useState(rowData || "");
    console.log(cell);
    const formula = cell?.column?.columnDef?.formulaFieldOptions?.formula;
    //const formula = "Num1 + Num2";
    if(!formula){
      return <></>
    }
    //console.log(formula)
    const {columns,data } = useContext(TableContext);
    
    const myMap = new Map();
    columns.forEach((column)=>{
      if(column.fieldName){
        myMap.set(column.fieldName,cell.row.getValue(column.fieldId));
        //console.log(column.fieldName,cell.row.getValue(column.fieldId))
      }
    })
    
    const myString = Array.from(myMap.keys()).join('|');
    console.log("myMap",myMap)
    //console.log(myString)
    const regexPattern = new RegExp(`(${myString})`, 'g');
    const formulaArray = formula.split(regexPattern);
    //console.log(formulaArray)
    const formulaArray2 = formulaArray.map((item)=>{
      if(myMap.has(item)){
        return myMap.get(item);
      }
      if(item !== "")
        return item;
    })
    console.log(formulaArray2)
    const formulaString = formulaArray2.join('');
    //console.log(formulaString)
    //console.log(eval(formulaString))
    useEffect(()=>{
      try{
        setValue(eval(formulaString))

      }
      catch(err){
        console.log(err)
        setValue("")
      }
    },[data])
  return (
    <div className="flex p-1 px-2 w-full truncate justify-end">
        {value}
    </div>
  )
}

export default FormulaCell;