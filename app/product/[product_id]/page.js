import {
  Button,
  Checkbox,
  Label,
  TextInput,
  FloatingLabel,
} from "flowbite-react";

const ProductPage = ({ params }) => {
  const { product_id } = params;

  return (
    <form className="flex flex-col max-w-md gap-4">
      <h1>{product_id}</h1>
      <div>
        <div className="block mb-2">
          <Label
            htmlFor="email1"
            value="Title"
          />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="block mb-2">
          <Label
            htmlFor="password1"
            value="Your password"
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProductPage;
