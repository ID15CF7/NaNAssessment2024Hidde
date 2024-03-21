const ProductCart = ({ product }) => {
  const { image, title, content } = product;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <img
        className="object-cover w-full rounded-t-lg max-h-96"
        src={image}
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">{content}</p>
      </div>
    </div>
  );
};

export default ProductCart;
