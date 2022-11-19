import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';


const DebounceSrcatch = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  const onSearchText = (input) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3002/products?q=${input}`)
      .then((result) => {
        setResult(result.data);
        setErrorMsg('');
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMsg('Something went wrong. Try again later.');
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
    inputRef.current(input);
  };

  return (
    <>
        <form className="text-black w-full">
           <input type="text" className="rounded-lg w-full text-[10px] px-4 py-1 md:py-2 sm:text-sm lg:text-lg "     onChange={handleInputChange}
              value={input}
              autoComplete="off" placeholder="دنبال چی میگردی...؟" />
          {errorMsg && <p className="absolute rounded-b-lg w-full bg-white">{errorMsg}</p>}
          {isLoading && <p className="absolute rounded-b-lg w-full bg-white">Loading...</p>}
         
          {input != '' ? 
        <div className='text-black absolute rounded-b-lg w-full bg-white'>
        {result.map((item, index) => (
          <Link to={`details/${item.id}`} key={index} className="block">{item.name}</Link>
          ))}
      </div>
      :<></>}
              </form>
              </>
  );
};

export default DebounceSrcatch;
