import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../tableComponents/TableComponents';
//import * as math from 'mathjs'

const customFunctions = {
  ABS: x => Math.abs(x),
  SUM: (...args) => args.reduce((sum, arg) => sum + arg, 0),
  MIN: (...args) => Math.min(...args),
  MAX: (...args) => Math.max(...args),
  AVG: (...args) => args.reduce((sum, arg) => sum + arg, 0) / args.length
};

const FormulaCell = ({cell,rowData}) => {
    const [value,setValue] = useState(rowData || "");
    //console.log(cell);
    const formula = cell?.column?.columnDef?.formulaFieldOptions?.formula;
    //const formula = "Num1 + Num2";
    if(!formula){
      return <></>
    }
    //console.log(formula)
    const {columns,data } = useContext(TableContext);
    console.log("Record Id: ",cell?.row?.original?.id52148213343234567);
    
    // const myMap = new Map();
    // columns.forEach((column)=>{
    //   if(column.fieldName){
    //     myMap.set(column.fieldName,cell.row.getValue(column.fieldId));
    //     //console.log(column.fieldName,cell.row.getValue(column.fieldId))
    //   }
    // })
    
    // const myString = Array.from(myMap.keys()).join('|');
    // //console.log("myMap",myMap)
    // //console.log(myString)
    // const regexPattern = new RegExp(`(${myString})`, 'g');
    // const formulaArray = formula.split(regexPattern);
    // //console.log(formulaArray)
    // const formulaArray2 = formulaArray.map((item)=>{
    //   if(myMap.has(item)){
    //     return myMap.get(item);
    //   }
    //   if(item !== "")
    //     return item;
    // })
    // //console.log(formulaArray2)
    // const formulaString = formulaArray2.join('');

    
    
    useEffect(()=>{
      try{
        setValue(Function("return "+formulaString)())

      }
      catch(err){
        console.log(err)
        setValue("")
      }
    },[data])
  return (
    <div className="flex p-1 px-2 w-full truncate justify-end">{value}</div>
  );
};

export default FormulaCell;
