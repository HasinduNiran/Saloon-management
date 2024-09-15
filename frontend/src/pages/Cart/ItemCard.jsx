import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ItemCard = ({ ItemNo, image, ItemName, SPrice }) => {
    return (
        <div className="w-72 shadow-lg rounded-lg bg-neutral-50 p-4 transform transition-transform duration-300 hover:-translate-y-2">
            <Link to={`/itemdis/${ItemNo}`}>
                <img
                    src={image}
                    alt={ItemName}
                    className="w-full h-48 object-cover rounded-md"
                />
            </Link>
            <div className="mt-4">
                <h2 className="font-semibold text-lg font-title text-pink-500">{ItemName}</h2>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-pink-500">{`$${SPrice}`}</span>
                <button className="bg-primary rounded-md text-pink-500 py-2 px-4">
                    <FaCartArrowDown size={24} />
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
