import React from "react";

import ViewCard from "../components/ViewCard";
import { useStateContext } from "../contexts/ContextProvider";
import {
  AiFillAccountBook,
  AiFillAppstore,
  AiFillCalendar,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineUpload,
} from "react-icons/ai";
const MainPart = () => {
  const { user, logout } = useStateContext();
  return (
    <section className="w-full   ml-5 mr-5 mt-4 p-2">
      <div className="flex flex-row gap-5 items-center justify-center p-5">
        {user.email == "admin@vatstore.com" ? (
          <>
            <ViewCard
              title="Add User"
              link="/adduser"
              icon={<AiFillAccountBook />}
            />
            <ViewCard
              title="User Details"
              link="/addDetails"
              icon={<AiFillAccountBook />}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-row gap-5 items-center justify-center">
        <ViewCard
          title="Customer Entry"
          link="/CustomerEntry"
          icon={<AiFillAccountBook />}
        />
        <ViewCard
          title="Customer View"
          link="/CustomerView"
          icon={<AiFillAppstore />}
        />
        <ViewCard
          title="Product Entry"
          link="/ProductEntry"
          icon={<AiFillCalendar />}
        />
        <ViewCard
          title="Product View"
          link="/ProductView"
          icon={<AiOutlineUnorderedList />}
        />
      </div>
      <div className="flex flex-row gap-5 items-center justify-center p-5">
        <ViewCard
          title="Supplier Entry"
          link="/SupplierEntry"
          icon={<AiOutlineUpload />}
        />
        <ViewCard
          title="Supplier View"
          link="/SupplierView"
          icon={<AiOutlineOrderedList />}
        />
        <ViewCard
          title="Product Transfer Entry"
          link="/ProductTransferEntry"
          icon={<AiOutlineUpload />}
        />
        <ViewCard
          title="Product Transfer List"
          link="/ProductTransferList"
          icon={<AiOutlineOrderedList />}
        />
      </div>
      <div className="flex flex-row gap-5 items-center justify-center p-5">
        <ViewCard title="Product Category Entry" link="/ProductCategory" />
        <ViewCard title="Product Category List " link="/" />
        <ViewCard title="Musak Challan Entry" link="/" />
        <ViewCard title="Musak Challan List" link="/" />
      </div>
    </section>
  );
};

export default MainPart;
