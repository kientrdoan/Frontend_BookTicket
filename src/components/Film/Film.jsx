import React from "react";

export default function Film(props) {
  const { phim } = props;

  return (
    <div className='mr-2 h-full border-2 border-gray-200 border-opacity-75 rounded-lg overflow-hidden text-center relative'>
      <div
        style={{
          background: `url(${phim.hinhAnh}), url(https://picsum.photos/seed/picsum/200/300)`,
          backgroundPosition: "center",
          backgroundSize: "100%, 100%",
        }}
      >
        <img
          // className='lg:h-48 md:h-36 w-full object-cover object-center'
          src={phim.hinhAnh}
          alt={phim.tenPhim}
          className="opacity-0, w-full"
          style={{height: '300px'}}
        />
      </div>

      <h1 className='title-font text-lg font-medium text-gray-900 mb-3 h-16'>
        {phim.tenPhim}
      </h1>
      <p className='leading-relaxed mb-3'>
        {phim.moTa > 100 ? (
          <span>{phim.moTa.slice(0, 100)}...</span>
        ) : (
          <span>{phim.moTa.slice}</span>
        )}
      </p>
      <a className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0'>
        Mua Ngay
        <svg
          className='w-4 h-4 ml-2'
          viewBox='0 0 24 24'
          stroke='currentColor'
          stroke-width='2'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path d='M5 12h14'></path>
          <path d='M12 5l7 7-7 7'></path>
        </svg>
      </a>
    </div>
  );
}
