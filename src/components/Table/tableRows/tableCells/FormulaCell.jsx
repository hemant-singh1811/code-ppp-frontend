import React, { useContext, useEffect, useState } from 'react'
import { TableContext } from '../../tableComponents/TableComponents';
import * as math from 'mathjs';

const customFunctions = {
  ABS: x => Math.abs(x),
  SUM: (...args) => args.reduce((sum, arg) => sum + arg, 0),
  MIN: (...args) => Math.min(...args),
  MAX: (...args) => Math.max(...args),
  AVG: (...args) => args.reduce((sum, arg) => sum + arg, 0) / args.length
};

const FormulaCell = ({cell,rowData}) => {
    const [value,setValue] = useState(rowData || "");
    const formula = cell?.column?.columnDef?.formulaFieldOptions?.formula.toLowerCase().replace(/\s+/g, ' ').trim();
    if(!formula){
      return <></>
    }
    const {columns,data } = useContext(TableContext);
    console.log("Record Id: ",cell?.row?.original?.id52148213343234567);
    const myMap = new Map();
    columns.forEach((column)=>{
      if(column.fieldName){
        myMap.set(column.fieldName.toLowerCase(),cell.row.getValue(column.fieldId));
      }
    })
    

    const myString = Array.from(myMap.keys()).join('|');
    const regexPattern = new RegExp(`(${myString}|[+\\-*/])`, 'g');
    const formulaArray = formula.split(regexPattern).filter((item)=>item.trim() !== "");
    const formulaArray2 = formulaArray.map((item)=>{
      if(myMap.has(item)){
        return myMap.get(item) ? myMap.get(item) : 0;
      }
      if(operators[item]){
        return item;
      }
      return 0;
    })

    const formulaString = formulaArray2.join('');
    // console.log(formulaString)
    // const scope = math.create();
    // scope.import(customFunctions);


    // columns?.forEach((column)=>{
    //   if(column?.fieldName)
    //     scope[column?.fieldName?.toLowerCase()] = cell?.row?.getValue(column.fieldId);
    // })
    
    // console.log("Formula: ",formula) ;
    //     console.log("Scope: ",scope) ;
     //   const result = math.evaluate(formula,scope);

    useEffect(()=>{
      try{
        console.log("Formula: ",formula) ;
        console.log("Scope: ",scope) ;
        const result = Function(`"use strict";return (${formulaString})`)();
        //const result = math.evaluate(formula,scope);
        setValue(result.toFixed(2))
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