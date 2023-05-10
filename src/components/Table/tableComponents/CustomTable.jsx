import React, { useContext, useRef, useState } from 'react';
import TableVirtualRows from '../tableRows/TableVirtualRows';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { flexRender } from '@tanstack/react-table';
import { TableContext } from './TableComponents';
import { ResizableSidebar } from '../tableUtilityBar/ResizableSidebar';
import TableColumnAdd from '../tableUtilities/TableColumnAdd';
import TableColumnDropDown from '../tableUtilities/TableColumnDropDown';
import AddRowTable from '../tableUtilities/AddRowTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Popover } from '@headlessui/react';
import { useClickAway } from 'react-use';
import { HTML5Backend } from 'react-dnd-html5-backend';

const getSvg = (dataType) => {
  switch (dataType) {
    case 'multipleRecordLinks':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M120 936v-60h720v60H120Zm164-165v-60h393v60H284ZM120 606v-60h720v60H120Zm164-165v-60h393v60H284ZM120 276v-60h720v60H120Z' />
        </svg>
      );
    case 'singleLineText':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M200 856v-60h560v60H200Zm76-160 175-440h58l175 440h-55l-45-119H376l-45 119h-55Zm117-164h174l-85-222h-4l-85 222Z' />
        </svg>
      );
    case 'multilineText':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M480 936v-71l216-216 71 71-216 216h-71ZM120 726v-60h300v60H120Zm690-49-71-71 29-29q8-8 21-8t21 8l29 29q8 8 8 21t-8 21l-29 29ZM120 561v-60h470v60H120Zm0-165v-60h470v60H120Z' />
        </svg>
      );
    case 'multipleAttachments':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M460 971.384q-87.154 0-148.961-60.335-61.808-60.336-61.808-147.587V323.846q0-61.054 43.95-104.835 43.949-43.78 105.665-43.78 62.144 0 105.688 43.543 43.543 43.543 43.543 105.687V665H515V323.846q0-48.219-33.681-81.879-33.682-33.66-82.462-33.66t-82.664 33.66q-33.885 33.66-33.885 81.879v441.231q0 72.616 52.154 122.923 52.154 50.308 125.391 50.308 36.252 0 68.238-13.373 31.986-13.373 56.139-36.396v43.153q-26.846 18.846-57.98 29.269-31.133 10.423-66.25 10.423Zm197.308-52.692v-120h-120v-45.384h120v-120h45.384v120h120v45.384h-120v120h-45.384ZM460 780.616v33.076q-37.231 0-62.654-27.354-25.423-27.353-25.423-65.184V322.615H405v400.77q0 24.115 15.812 40.673 15.813 16.558 39.188 16.558Zm177.692-237.77V322.615h33.077v220.231h-33.077Z' />
        </svg>
      );
    case 'checkbox':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M216.309 915.999q-31.958 0-54.133-22.175-22.175-22.175-22.175-54.133V312.309q0-31.958 22.175-54.133 22.175-22.175 54.133-22.175h527.382q31.958 0 54.133 22.175 22.175 22.175 22.175 54.133v527.382q0 31.958-22.175 54.133-22.175 22.175-54.133 22.175H216.309Zm0-63.999h527.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847V312.309q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H216.309q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v527.382q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462ZM426 717.076q7.231 0 14.161-2.762 6.931-2.762 13.146-9.469l218.539-218.538q9.307-9.307 9.807-22.076t-9.851-23.12q-9.648-9.649-22.533-9.649-12.884 0-22.576 9.692L426 641.847l-90.924-90.923q-9.307-9.308-21.576-9.808t-22.62 9.851q-9.649 9.649-9.649 22.533 0 12.884 9.693 22.576l107.769 108.769q6.215 6.707 13.146 9.469 6.93 2.762 14.161 2.762ZM204 852V300 852Z' />
        </svg>
      );
    case 'multipleSelects':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M640.043 891.999q-21.274 0-36.504-15.407-15.23-15.406-15.23-36.68V688.043q0-21.274 15.406-36.504 15.406-15.23 36.68-15.23h151.869q21.274 0 36.504 15.406 15.231 15.406 15.231 36.68v151.869q0 21.274-15.407 36.504-15.406 15.231-36.68 15.231H640.043Zm.264-51.999H792V688.307H640.307V840Zm-498.306-49.847q-11.05 0-18.525-7.418-7.475-7.418-7.475-18.384 0-10.966 7.475-18.582 7.475-7.615 18.525-7.615h316.615q11.05 0 18.525 7.418 7.475 7.419 7.475 18.385 0 10.965-7.475 18.581-7.475 7.615-18.525 7.615H142.001Zm498.042-274.462q-21.274 0-36.504-15.406-15.23-15.406-15.23-36.68V311.736q0-21.274 15.406-36.504 15.406-15.231 36.68-15.231h151.869q21.274 0 36.504 15.407 15.231 15.406 15.231 36.68v151.869q0 21.274-15.407 36.504-15.406 15.23-36.68 15.23H640.043Zm.264-51.998H792V312H640.307v151.693Zm-498.306-49.847q-11.05 0-18.525-7.418-7.475-7.419-7.475-18.385 0-10.965 7.475-18.581 7.475-7.615 18.525-7.615h316.615q11.05 0 18.525 7.418 7.475 7.418 7.475 18.384 0 10.966-7.475 18.582-7.475 7.615-18.525 7.615H142.001Zm574.153 350.308Zm0-376.308Z' />
        </svg>
      );
    case 'singleSelect':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='m480 613.232-93.308-93.308q-8.212-8.308-18.695-8.308-10.484 0-18.073 8.308-8.308 7.589-8.116 18.217.193 10.628 8.054 18.49l107.892 107.891q9.785 9.785 22.428 9.785t22.125-9.846l107.532-107.532q7.776-7.775 8.16-18.429.385-10.654-7.923-19.055-7.922-7.829-18.576-7.444-10.654.384-18.455 8.186L480 613.232Zm.343 326.767q-75.112 0-141.48-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.087t-28.433-141.673q0-75.378 28.42-141.246 28.42-65.869 78.21-115.682 49.791-49.814 116.087-78.247t141.673-28.433q75.378 0 141.246 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.853t28.433 141.173q0 75.112-28.42 141.48-28.42 66.369-78.21 116.182-49.791 49.814-115.853 78.247t-141.173 28.433ZM480 888q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z' />
        </svg>
      );
    case 'phoneNumber':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M277.694 995.999q-23.529 0-40.611-17.082-17.082-17.082-17.082-40.611V213.694q0-23.529 17.082-40.611 17.082-17.082 40.611-17.082h404.612q23.529 0 40.611 17.082 17.082 17.082 17.082 40.611v724.612q0 23.529-17.082 40.611-17.082 17.082-40.611 17.082H277.694Zm-12.309-152.693v95q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h404.612q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-95h-429.23Zm214.797 81.539q11.664 0 19.779-8.099 8.116-8.098 8.116-19.961 0-11.863-8.298-19.978-8.297-8.116-19.961-8.116-11.664 0-19.779 8.296-8.116 8.296-8.116 19.957 0 12.055 8.298 19.978 8.297 7.923 19.961 7.923ZM265.385 797.922h429.23v-508.46h-429.23v508.46Zm0-553.844h429.23v-30.384q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H277.694q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v30.384Zm0 599.228v107.309-107.309Zm0-599.228v-42.693 42.693Z' />
        </svg>
      );
    case 'email':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M157.694 875.999q-23.529 0-40.611-17.082-17.082-17.082-17.082-40.611V333.694q0-23.529 17.082-40.611 17.082-17.082 40.611-17.082h644.612q23.529 0 40.611 17.082 17.082 17.082 17.082 40.611v484.612q0 23.529-17.082 40.611-17.082 17.082-40.611 17.082H157.694ZM480 582.076 145.385 360.615v457.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h644.612q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847V360.615L480 582.076Zm0-47.691 325.615-213h-650.23l324.615 213Zm-334.615-173.77v-39.23 496.921q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h-12.309v-470Z' />
        </svg>
      );
    case 'url':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M280 757.537q-75.338 0-128.438-53.093-53.1-53.093-53.1-128.422t53.1-128.444q53.1-53.115 128.438-53.115h118.308q12.75 0 22.374 9.629 9.625 9.628 9.625 22.384 0 12.755-9.625 22.37-9.624 9.615-22.374 9.615H280q-50.385 0-83.962 33.577-33.577 33.577-33.577 83.962 0 50.385 33.577 83.962 33.577 33.577 83.962 33.577h118.308q12.75 0 22.374 9.628 9.625 9.629 9.625 22.384 0 12.756-9.625 22.371-9.624 9.615-22.374 9.615H280Zm82-149.538q-12.75 0-22.374-9.628-9.625-9.629-9.625-22.384 0-12.756 9.625-22.371 9.624-9.615 22.374-9.615h236q12.75 0 22.375 9.628 9.624 9.629 9.624 22.384 0 12.756-9.624 22.371-9.625 9.615-22.375 9.615H362Zm199.692 149.538q-12.75 0-22.374-9.629-9.625-9.628-9.625-22.384 0-12.755 9.625-22.37 9.624-9.615 22.374-9.615H680q50.385 0 83.962-33.577 33.577-33.577 33.577-83.962 0-50.385-33.577-83.962-33.577-33.577-83.962-33.577H561.692q-12.75 0-22.374-9.628-9.625-9.629-9.625-22.384 0-12.756 9.625-22.371 9.624-9.615 22.374-9.615H680q75.338 0 128.438 53.093 53.099 53.093 53.099 128.422t-53.099 128.444q-53.1 53.115-128.438 53.115H561.692Z' />
        </svg>
      );
    case 'createdTime':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M367.693 191.384v-45.383h224.614v45.383H367.693Zm89.615 447.385h45.384V421.462h-45.384v217.307ZM480 955.383q-70.154 0-131.999-26.961-61.846-26.962-108.154-73.077-46.307-46.115-73.076-108.153-26.77-62.038-26.77-132 0-69.961 26.77-131.807 26.769-61.846 73.076-108.153 46.308-46.308 108.154-73.077Q409.846 275.386 480 275.386q63.923 0 121 22.115 57.076 22.116 101.922 61.731l46-46.384 31.999 31.999-46.384 46.384q36.769 40 61.115 95.654 24.347 55.654 24.347 128.5 0 69.769-26.77 131.807-26.769 62.038-73.076 108.153-46.308 46.115-108.154 73.077Q550.154 955.383 480 955.383ZM479.946 910q122.746 0 208.708-85.907 85.961-85.907 85.961-208.654 0-122.746-85.907-208.708-85.907-85.961-208.654-85.961-122.746 0-208.708 85.907-85.961 85.907-85.961 208.653 0 122.747 85.907 208.708Q357.199 910 479.946 910ZM480 616Z' />
        </svg>
      );
    case 'lastModifiedTime':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M175.464 430.922V251.001h45.384v103.692q49.307-55.23 115.807-86.961Q403.154 236.001 477 236.001q142.538 0 242.384 98.423 99.845 98.423 99.845 239.961v12.692h-45.383v-14.923q0-122.077-86.885-206.423Q600.077 281.385 477 281.385q-64.538 0-121.73 28.308Q298.078 338 254.847 385.538h100.769v45.384H175.464Zm-35.463 155.233h45.384q4.231 117.307 85.808 199.345 81.576 82.038 198.499 84.73h8.538l26.307 43.538q-7.923 1.615-16.346 1.923-8.422.308-17.345.308-135.922-1.924-231.653-97.423-95.73-95.499-99.192-232.421ZM564.616 689 458.308 584.307V373.769h45.384v191.693l85.231 83.231L564.616 689Zm185.385 349.69L741.54 980q-19.924-4.231-37.654-13.885-17.731-9.654-32.116-25.192l-50 12-17.307-28.922 42.385-38.231q-5.308-15.461-5.308-32.308 0-16.846 5.308-32.693l-43.154-38.615 18.076-29.691 50.385 13.154q14.384-15.539 31.923-25 17.538-9.462 37.462-14.077l8.461-58.692h37.845l8.077 58.692q21.077 4.615 38.616 14.461 17.538 9.847 31.538 25.385l51.538-13.154 17.307 30.076-43.538 38.615q4.923 16.231 4.923 32.501 0 16.269-4.923 30.192l44.308 39.385-17.307 28.922-52.308-12.769q-13.615 15.923-31.538 25.769-17.924 9.846-38.616 14.077l-8.077 58.69h-37.845Zm18.923-102.151q36.384 0 59.73-23.346 23.347-23.346 23.347-59.731 0-36.384-23.347-59.731-23.346-23.346-59.73-23.346-36.385 0-59.731 23.346-23.347 23.347-23.347 59.731 0 36.385 23.347 59.731 23.346 23.346 59.731 23.346Z' />
        </svg>
      );
    case 'createdBy':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M480 563.076q-57.749 0-95.22-37.471t-37.471-95.412q0-57.942 37.471-95.221 37.471-37.278 95.22-37.278t95.22 37.278q37.471 37.279 37.471 95.221 0 57.941-37.471 95.412-37.471 37.471-95.22 37.471Zm-299.999 305.23v-75.922q0-32.23 17.077-56.153 17.077-23.923 44.385-36.769 63.153-28.077 121.756-42.308 58.604-14.23 116.769-14.23 58.166 0 116.473 14.538Q654.769 672 717.672 699.734q28.374 12.812 45.35 36.616 16.977 23.804 16.977 56.034v75.922H180.001Zm45.384-45.384h509.23v-30.538q0-15.615-9.885-29.923-9.884-14.308-25.808-22.462-58.999-28.692-111.302-40.192-52.302-11.5-107.62-11.5-55.318 0-108.428 11.5t-111.11 40.192q-15.923 8.154-25.5 22.462t-9.577 29.923v30.538ZM480 517.693q37.461 0 62.384-24.924 24.923-24.923 24.923-62.384t-24.923-62.384Q517.461 343.078 480 343.078t-62.384 24.923q-24.923 24.923-24.923 62.384t24.923 62.384q24.923 24.924 62.384 24.924Zm0-87.308Zm0 392.537Z' />
        </svg>
      );
    case 'lastModifiedBy':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M480 563.076q-57.749 0-95.22-37.471t-37.471-95.412q0-57.942 37.471-95.221 37.471-37.278 95.22-37.278t95.22 37.278q37.471 37.279 37.471 95.221 0 57.941-37.471 95.412-37.471 37.471-95.22 37.471Zm-299.999 305.23v-75.922q0-32.23 17.077-56.153 17.077-23.923 44.385-36.769 63.153-28.077 121.756-42.308 58.604-14.23 116.769-14.23 58.166 0 116.473 14.538Q654.769 672 717.672 699.734q28.374 12.812 45.35 36.616 16.977 23.804 16.977 56.034v75.922H180.001Zm45.384-45.384h509.23v-30.538q0-15.615-9.885-29.923-9.884-14.308-25.808-22.462-58.999-28.692-111.302-40.192-52.302-11.5-107.62-11.5-55.318 0-108.428 11.5t-111.11 40.192q-15.923 8.154-25.5 22.462t-9.577 29.923v30.538ZM480 517.693q37.461 0 62.384-24.924 24.923-24.923 24.923-62.384t-24.923-62.384Q517.461 343.078 480 343.078t-62.384 24.923q-24.923 24.923-24.923 62.384t24.923 62.384q24.923 24.924 62.384 24.924Zm0-87.308Zm0 392.537Z' />
        </svg>
      );
    case 'autoNumber':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M492 779h60V373H409v60h83v346ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z' />
        </svg>
      );
    case 'button':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='m306.615 675.924 93.078-118.539h181.693L306.615 333.23v342.694Zm258.999 231.381q-14.153 6.077-29.307.423-15.153-5.653-21.23-19.807L398.615 640.383l-87.307 107.845q-14.461 17.692-35.576 10.154-21.116-7.538-21.116-30.846V290.309q0-20.692 18.385-29.038 18.384-8.346 34.461 3.731l349.074 286.92q17.692 14.847 9.961 36.154-7.73 21.308-30.653 21.308H467.922l116.077 247.384q6.076 14.153.923 29.307-5.154 15.154-19.308 21.23Zm-165.921-349.92Z' />
        </svg>
      );
    case 'date':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 96 960 960'
          width='20'>
          <path d='M480 661.077q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038T480 586.309q14.692 0 26.038 11.346t11.346 26.038q0 14.692-11.346 26.038T480 661.077Zm-160 0q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038T320 586.309q14.692 0 26.038 11.346t11.346 26.038q0 14.692-11.346 26.038T320 661.077Zm320 0q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038T640 586.309q14.692 0 26.038 11.346t11.346 26.038q0 14.692-11.346 26.038T640 661.077ZM480 818q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038 11.346-11.347 26.038-11.347t26.038 11.347q11.346 11.346 11.346 26.038t-11.346 26.038Q494.692 818 480 818Zm-160 0q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038 11.346-11.347 26.038-11.347t26.038 11.347q11.346 11.346 11.346 26.038t-11.346 26.038Q334.692 818 320 818Zm320 0q-14.692 0-26.038-11.346t-11.346-26.038q0-14.692 11.346-26.038 11.346-11.347 26.038-11.347t26.038 11.347q11.346 11.346 11.346 26.038t-11.346 26.038Q654.692 818 640 818ZM216.309 955.999q-31.958 0-54.133-22.175-22.175-22.175-22.175-54.133V356.309q0-31.958 22.175-54.133 22.175-22.175 54.133-22.175h47.385v-55.847q0-13.153 9.808-22.961 9.807-9.807 22.961-9.807 13.153 0 22.961 9.807 9.807 9.808 9.807 22.961v55.847h303.076v-56.616q0-12.769 9.615-22.384t22.384-9.615q12.769 0 22.384 9.615 9.616 9.615 9.616 22.384v56.616h47.385q31.958 0 54.133 22.175 22.175 22.175 22.175 54.133v523.382q0 31.958-22.175 54.133-22.175 22.175-54.133 22.175H216.309Zm0-63.999h527.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847V510.309H204v369.382q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462ZM204 446.31h552v-90.001q0-5.385-3.462-8.847-3.462-3.462-8.847-3.462H216.309q-5.385 0-8.847 3.462-3.462 3.462-3.462 8.847v90.001Zm0 0V344v102.31Z' />
        </svg>
      );
    default:
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
          />
        </svg>
      );
  }
};

const fieldName = (dataType) => {
  switch (dataType) {
    case 'multipleRecordLinks':
      return 'Multiple Record Links';
    case 'singleLineText':
      return 'Single Line Text';
    case 'multilineText':
      return 'Multiline Text';
    case 'multipleAttachments':
      return 'Multiple Attachments';
    case 'checkbox':
      return 'Checkbox';
    case 'multipleSelects':
      return 'Multiple Selects';
    case 'singleSelect':
      return 'Single Select';
    case 'phoneNumber':
      return 'Phone Number';
    case 'email':
      return 'Email';
    case 'url':
      return 'Url';
    case 'createdTime':
      return 'Created Time';
    case 'lastModifiedTime':
      return 'Last Modified Time';
    case 'createdBy':
      return 'Created By';
    case 'lastModifiedBy':
      return 'Last Modified By';
    case 'autoNumber':
      return 'Auto Number';
    case 'button':
      return 'Button';
    case 'date':
      return 'Date';
    default:
      return `${dataType}: UnSupported Field Type ⚠️`;
  }
};

const DraggableColumnHeader = ({ header, table, index }) => {
  const { setColumnOrder } = table;
  const { columnOrder } = table.options.state;
  const { column } = header;
  const columnDropdownRef = React.useRef();

  // const divRef = useRef(null);

  // const handleMouseDown = () => {
  //   divRef.current.style.cursor = "grabbing";
  // };

  // const handleMouseUp = () => {
  //   divRef.current.style.cursor = "grab";
  // };

  const divRef = useRef(null);

  const handleMouseOver = () => {
    divRef.current.style.display = 'block';
    // divRef.current.style.opacity = 100;
  };

  const handleMouseLeave = () => {
    divRef.current.style.display = 'none';
    // divRef.current.style.opacity = 0;
  };

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonRef = useRef(null);

  useClickAway(buttonRef, () => {
    setIsMenuOpen(false);
  });

  const handleContextMenu = (event) => {
    event.preventDefault();
    setIsMenuOpen(true);
  };
  // console.log(column);
  return (
    <Popover className='' ref={buttonRef}>
      {({ open, close }) => (
        <div
          onContextMenu={handleContextMenu}
          className={`th  bg-[#f5f5f5] relative ${
            index === 0 && 'fixed-column '
          } relative`}
          {...{
            key: header.id,
            style: {
              width: header.getSize(),
              boxShadow: column.columnDef?.hiddenInConditions && 'none',
              height: 32,
            },
          }}
          ref={(el) => {
            previewRef(el);
            if (!column?.columnDef?.is_primary) dropRef(el);
            // divRef;
          }}
          colSpan={header.colSpan}>
          <div
            ref={!column?.columnDef?.is_primary ? dragRef : null}
            className='capitalize text-lg font-normal px-2  flex justify-between item items-center h-full'>
            <div
              className={`flex items-center ${
                index === 0 ? 'w-full' : ' w-[calc(100%_-_20px)]'
              }`}>
              {index !== 0 && (
                <div
                  className='h-full min-w-[20px]'
                  onMouseEnter={() =>
                    handleMouseOver(column.columnDef.field_type)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(column.columnDef.field_type)
                  }>
                  {getSvg(column.columnDef.field_type)}
                </div>
              )}
              <div
                className={`truncate w-full text-left ${
                  index !== 0 && 'ml-1'
                }`}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            </div>
            {index !== 0 && (
              <div
                ref={divRef}
                className='absolute top-9 bg-white rounded-md px-2 border-2 hidden min-w-max'>
                {fieldName(column.columnDef.field_type)}
              </div>
            )}

            {index !== 0 && (
              <TableColumnDropDown
                open={open}
                close={close}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                columnDropdownRef={columnDropdownRef}
                columnDef={header?.column?.columnDef}
              />
            )}
          </div>
          {index !== 0 && (
            <div
              {...{
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
              }}
              className=' absolute z-10 w-4 h-full top-0 -right-2 resize-container flex justify-center items-center'>
              <div
                {...{
                  className: `resizerHeader ${
                    header.column.getIsResizing() ? 'isResizingHeader' : ''
                  }`,
                }}
              />
            </div>
          )}
        </div>
      )}
    </Popover>
  );
};
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  const columnOrderUpdated = Object.assign([], columnOrder);
  // debugger
  columnOrderUpdated.splice(
    columnOrderUpdated.indexOf(targetColumnId),
    0,
    columnOrderUpdated.splice(columnOrderUpdated.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrderUpdated];
};

export default function CustomTable() {
  const { toggle, table } = useContext(TableContext);
  const { isViewsOpen } = useSelector((state) => state.globalState);
  const tableContainerRef = React.useRef(null);
  const { rows } = table.getRowModel();
  return (
    <div className='flex overflow-hidden'>
      {isViewsOpen && <ResizableSidebar />}
      <DndProvider backend={HTML5Backend}>
        <div
          id='custom-scrollbar'
          className={`overflow-auto overflow-y-hidden bg-[#f7f7f7] 
       ${
         toggle
           ? isViewsOpen
             ? 'w-[calc(100vw_-_330px)]'
             : 'w-[calc(100vw_-_80px)]'
           : isViewsOpen
           ? `w-[calc(100vw_-_495px)]`
           : `w-[calc(100vw_-_245px)]`
       }
        `}>
          <div
            ref={tableContainerRef}
            {...{
              style: {
                width: table.getTotalSize() + 120,
              },
            }}
            className={`divTable `}>
            <div className='thead bg-[#f5f5f5] text-[#333333] relative z-[2]'>
              {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className='row'>
                  {headerGroup.headers.map((header, index) => (
                    <DraggableColumnHeader
                      key={header.id}
                      header={header}
                      table={table}
                      index={index}
                    />
                  ))}
                  <TableColumnAdd headers={headerGroup.headers} />
                </div>
              ))}
            </div>
            <TableVirtualRows
              tableContainerRef={tableContainerRef}
              rows={rows}
            />
          </div>
          {/* <AddRowTable /> */}
        </div>
      </DndProvider>
    </div>
  );
}
