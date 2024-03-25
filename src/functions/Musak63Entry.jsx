import React, { useState, useEffect } from "react";
import {
  AiFillEdit,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../contexts/ContextProvider";

const Musak63Entry = () => {
  const { user } = useStateContext();
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [uomList, setUomList] = useState(null);
  const [StockQty, setStockQty] = useState(0);
  const [IssueQty, setIssueQty] = useState(0);
  const [Sku, setSku] = useState("");
  const [NetAmount, setNetAmount] = useState("");
  const [Vat, setVat] = useState(15);
  const [GrossAmount, setGrossAmount] = useState("");
  const [ItemNo, setItemNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [InvoiceNum, setInvoiceNum] = useState("");
  const [Address, setAddress] = useState("");
  const [ExportRemarks, setExportRemarks] = useState("");
  const [Cpc, setCpc] = useState("");
  const [ExportRate, setExportRate] = useState("");
  const [Customer, setCustomer] = useState();
  const [ChallanType, setChallanType] = useState(
    "(1004) Standard Rated Goods/Service(15%)"
  );
  const [issueDate, setIssueDate] = useState("");
  const [DeliveryDate, setDeliveryDate] = useState("");
  const [BIN, setBIN] = useState("");
  const [Destination, setDestination] = useState("");
  const [VehicleNature, setVehicleNature] = useState("");

  const [totalSku, setTotalSku] = useState(0);
  const [totalNetamount, setTotalNetamount] = useState(0);
  const [totalgrossamount, setTotalgrossamount] = useState(0);
  const [totalUnitPrice, settotalUnitPrice] = useState(0);

  const [customerList, setCustomerList] = useState();
  const [prodList, setProdList] = useState("");
  const [userData, setUserData] = useState(null);
  async function getUserData(db, userId) {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newAmountWithoutVAT = parseFloat(unitPrice) * parseFloat(IssueQty);
    const Gross = newAmountWithoutVAT * 0.15 + newAmountWithoutVAT;
    const VatAmount = newAmountWithoutVAT * 0.15;
    const newProduct = {
      productName,
      uom,
      unitPrice,
      StockQty,
      IssueQty,
      Sku,
      NetAmount: newAmountWithoutVAT,
      Vat: VatAmount,
      GrossAmount: Gross,
      ItemNo,
      remarks,
    };
    setProductList([...productList, newProduct]);
    // Clear input fields after adding a new product
    /* setTotalQuantity(totalQuantity + parseInt(quantity, 10));
    setTotalAmountWithoutVAT(totalAmountWithoutVAT + newAmountWithoutVAT);*/

    //setTotalSku(totalSku + parseInt(Sku, 10));
    setTotalNetamount((prevTotal) => prevTotal + newAmountWithoutVAT);
    setTotalgrossamount((prevTotal) => prevTotal + Gross);
    settotalUnitPrice((prevTotal) => prevTotal + parseFloat(unitPrice));

    setProductName("");
    setUom("");
    setUnitPrice(0);
    setStockQty("");
    setIssueQty(0);

    setSku("");
    setNetAmount("");
    setVat("");
    setGrossAmount("");
    setItemNo("");
    setRemarks("");
  };

  const getCurrentDateAndTime = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Change the date format as needed
    const formattedTime = currentDate.toLocaleTimeString(); // Change the time format as needed
    return `${formattedDate} ${formattedTime}`;
  };

  const handleDeleteProduct = (index) => {
    const updatedProductList = [...productList];
    const deletedProduct = updatedProductList.splice(index, 1)[0];

    setTotalNetamount((prevTotal) => prevTotal - deletedProduct.NetAmount);
    setTotalgrossamount((prevTotal) => prevTotal - deletedProduct.GrossAmount);
    settotalUnitPrice(
      (prevTotal) => prevTotal - parseFloat(deletedProduct.unitPrice)
    );
    setProductList(updatedProductList);

    /* setTotalQuantity(totalQuantity - parseInt(deletedProduct.quantity, 10));
    setTotalAmountWithoutVAT(
      totalAmountWithoutVAT - deletedProduct.amountWithoutVAT
    ); */
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = {
        issueDate,
        DeliveryDate,
        InvoiceNum,
        Customer,
        Address,
        BIN,
        ChallanType,
        Destination,
        ExportRemarks,
        VehicleNature,
        Cpc,
        HeadAddress: userData.Address,
        ExportRate,
        totalNetamount,
        totalSku,
        totalgrossamount,
        totalUnitPrice,
        productList,
      };
      await addDoc(collection(db, "SalesEntry"), {
        ...data,
      }).then(() => {
        toast.success("Successfully added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setInvoiceNum("");
        setAddress("");

        setChallanType("");
        setCustomer("");
        setDestination("");
        setBIN("");
        setExportRemarks("");
        setVehicleNature("");
        setExportRate("");
        setCpc("");
        setTotalNetamount(0);
        setTotalgrossamount(0);
        settotalUnitPrice(0);
        setProductList([]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const uomData = query(collection(db, "Uom"));
    const CustomerData = query(collection(db, "Customers"));
    const ProdData = query(collection(db, "Product"));

    const uomList2 = onSnapshot(uomData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setUomList(tempArr);
    });

    const customerList2 = onSnapshot(CustomerData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setCustomerList(tempArr);
    });

    const prodList2 = onSnapshot(ProdData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setProdList(tempArr);
    });

    setIssueDate(getCurrentDateAndTime());
    setDeliveryDate(getCurrentDateAndTime());
    return () => {
      uomList2();
      customerList2();
      prodList2();
    };
  }, []);

  useEffect(() => {
    getUserData(db, user.uid)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        alert("Error Occured");
      });
  }, [user]);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productName) {
          const q = query(
            collection(db, "Product"),
            where(`Name`, "==", productName)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const productDoc = querySnapshot.docs[0].data();

            // Update other state variables with values from the selected product
            setUom(productDoc.Uom);
            setUnitPrice(productDoc.UnitPrice);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [productName]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        if (Customer) {
          const q = query(
            collection(db, "Customers"),
            where(`Name`, "==", Customer)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const productDoc = querySnapshot.docs[0].data();

            // Update other state variables with values from the selected product
            setBIN(productDoc.BIN);
            setAddress(productDoc.Address);
            setDestination(productDoc.Address);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerDetails();
  }, [Customer]);
  const handleEditProduct = (index, e) => {
    e.preventDefault();
    // Set the editingIndex to the index of the product being edited
    setEditingIndex(index);

    // Populate the input fields with the values of the selected product
    const selectedProduct = productList[index];
    setProductName(selectedProduct.productName);
    setUom(selectedProduct.uom);
    setUnitPrice(selectedProduct.unitPrice);
    setStockQty(selectedProduct.StockQty);
    setIssueQty(selectedProduct.IssueQty);
    setSku(selectedProduct.Sku);
    setNetAmount(selectedProduct.NetAmount);
    setVat(selectedProduct.Vat);
    setGrossAmount(selectedProduct.GrossAmount);
    setRemarks(selectedProduct.remarks);
    setItemNo(selectedProduct.ItemNo);

    setTotalNetamount((prevTotal) => prevTotal - selectedProduct.NetAmount);
    setTotalgrossamount((prevTotal) => prevTotal - selectedProduct.GrossAmount);
    settotalUnitPrice(
      (prevTotal) => prevTotal - parseFloat(selectedProduct.unitPrice)
    );

    setIsEditClicked(true);
  };

  /*  const handleCancelEdit = () => {
    // Clear input fields and reset editingIndex when canceling edit
    setProductName("");
    setUom("");
    setUnitPrice("");
    setStockQty("");
    setIssueQty("");
    setSku("");
    setNetAmount("");
    setGrossAmount("");
    setRemarks("");
    setItemNo("");
    setEditingIndex(null);
  }; */

  const handleSaveEdit = (e) => {
    // Update the product in the productList array with edited values
    e.preventDefault();
    const newAmountWithoutVAT = parseFloat(unitPrice) * parseFloat(IssueQty);
    const VatAmount = newAmountWithoutVAT * 0.15;
    const Gross = newAmountWithoutVAT * 0.15 + newAmountWithoutVAT;
    const updatedProductList = [...productList];
    updatedProductList[editingIndex] = {
      productName,
      uom,
      unitPrice,
      StockQty,
      IssueQty,
      Sku,
      Vat: VatAmount,
      NetAmount: newAmountWithoutVAT,
      GrossAmount: Gross,
      remarks,
      ItemNo,
    };

    setTotalNetamount((prevTotal) => prevTotal + newAmountWithoutVAT);
    setTotalgrossamount((prevTotal) => prevTotal + Gross);
    settotalUnitPrice((prevTotal) => prevTotal + parseFloat(unitPrice));

    // Clear input fields and reset editingIndex after saving edit
    setProductName("");
    setUom("");
    setUnitPrice(0);
    setStockQty("");
    setIssueQty(0);
    setSku("");
    setVat("");
    setNetAmount("");
    setGrossAmount("");
    setRemarks("");
    setItemNo("");
    setEditingIndex(null);
    setIsEditClicked(false);

    // Update the state with the edited productList
    setProductList(updatedProductList);
  };

  useEffect(() => {
    const newAmountWithoutVAT = parseFloat(unitPrice) * parseFloat(IssueQty);
    const Gross = newAmountWithoutVAT * 0.15 + newAmountWithoutVAT;
    const VatAmount = newAmountWithoutVAT * 0.15;
    setNetAmount(newAmountWithoutVAT);
    setGrossAmount(Gross);
    setVat(VatAmount);
  }, [IssueQty]);

  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%]">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-[18px] font-bold">Sales Entry</h1>
          <button
            className="px-3 py-2 text-white text-[18px] rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <form className="w-[100%]">
          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Invoice No
                </label>
                <input
                  type="text"
                  placeholder="Enter Invoice"
                  value={InvoiceNum}
                  onChange={(e) => setInvoiceNum(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Customer
                </label>
                <select
                  value={Customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="appearance-none block w-[70%] bg-white text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option className="text-gray-600">Select...</option>
                  {customerList &&
                    customerList.map((item, index) => (
                      <option key={index}>{item.Name}</option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>

              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Challan Type
                </label>
                <input
                  type="text"
                  placeholder=""
                  disabled
                  value={ChallanType}
                  onChange={(e) => setChallanType(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Export Remarks
                </label>
                <input
                  type="text"
                  placeholder="Enter Export Remarks"
                  value={ExportRemarks}
                  onChange={(e) => setExportRemarks(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  CPC
                </label>
                <input
                  type="text"
                  placeholder="Enter CPC"
                  value={Cpc}
                  onChange={(e) => setCpc(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Export Rate
                </label>
                <input
                  type="text"
                  placeholder="Enter Export Rate"
                  value={ExportRate}
                  onChange={(e) => setExportRate(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Issue Date and Time
                </label>
                <input
                  type="text"
                  value={issueDate}
                  readOnly
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Delivery Date and Time
                </label>
                <input
                  type="text"
                  value={DeliveryDate}
                  readOnly
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  TBIN/NID
                </label>
                <input
                  type="text"
                  placeholder="Enter BIN"
                  value={BIN}
                  onChange={(e) => setBIN(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  value={Destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                  Vehicle Nature & No
                </label>
                <input
                  type="text"
                  value={VehicleNature}
                  placeholder="Enter Vehicle Number"
                  onChange={(e) => setVehicleNature(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-white text-left text-[18px] font-bold bg-gradient-to-tl from-sky-400 to-sky-800 p-2">
              Product Transfer Details
            </h1>
            <hr />
            <table className="w-[95%] items-center m-auto mt-2 text-xs text-left text-gray-50  border-collapse border border-gray-400">
              <thead className="text-[16px] text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
                <tr>
                  <th className="p-2 border border-gray-400">Product Name</th>
                  <th className="p-2 border border-gray-400">UOM</th>
                  <th className="p-2 border border-gray-400">Unit Price</th>
                  <th className="p-2 border border-gray-400">Stock Qty</th>
                  <th className="p-2 border border-gray-400">Issue Qty</th>
                  <th className="p-2 border border-gray-400">SKU</th>
                  <th className="p-2 border border-gray-400">Net Amount</th>
                  <th className="p-2 border border-gray-400">Vat</th>
                  <th className="p-2 border border-gray-400">Gross Amount</th>
                  <th className="p-2 border border-gray-400">Remarks</th>
                  <th className="p-2 border border-gray-400">Item No</th>
                  <th className="p-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="text-[16px]">
                <tr>
                  <td className="p-2 border border-gray-400 w-[15%]">
                    <select
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option className="text-gray-600">Select...</option>
                      {prodList &&
                        prodList.map((item, index) => (
                          <option key={index}>{item.Name}</option>
                        ))}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={uom}
                      onChange={(e) => setUom(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={StockQty}
                      onChange={(e) => setStockQty(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={IssueQty}
                      onChange={(e) => setIssueQty(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={Sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      disabled
                      value={NetAmount}
                      onChange={(e) => setNetAmount(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      disabled
                      value={Vat}
                      onChange={(e) => setVat(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>

                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      disabled
                      value={GrossAmount}
                      onChange={(e) => setGrossAmount(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>

                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="appearance-none block  w-full bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    <input
                      type="text"
                      value={ItemNo}
                      onChange={(e) => setItemNo(e.target.value)}
                      className="appearance-none block  w-[80px] bg-white text-gray-700 border border-gray-200 rounded-lg py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                  </td>
                  <td className="p-2 border border-gray-400 ">
                    {isEditClicked ? (
                      <>
                        <button
                          className="text-lg text-gray-800"
                          onClick={(e) => handleSaveEdit(e)}
                        >
                          <AiOutlinePlusCircle />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-lg text-gray-800"
                          onClick={handleAddProduct}
                        >
                          <AiOutlinePlusCircle />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.productName}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.uom}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.unitPrice}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.StockQty}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.IssueQty}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.Sku}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.NetAmount}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.Vat}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.GrossAmount}
                    </td>
                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.ItemNo}
                    </td>

                    <td className="p-2 border text-gray-800 border-gray-400 ">
                      {product.remarks}
                    </td>
                    <td className="p-2 border border-gray-400 ">
                      <button
                        className="text-md text-gray-800 pr-2"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <AiOutlineMinusCircle />
                      </button>
                      <button
                        className="text-md text-gray-800 "
                        onClick={(e) => handleEditProduct(index, e)}
                      >
                        <AiFillEdit />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    Total
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    {totalUnitPrice}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    {/* {totalQuantity} */}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    {/* {totalAmountWithoutVAT} */}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    {totalNetamount}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                  <td className="p-2 border text-gray-800 border-gray-400 ">
                    {totalgrossamount}
                  </td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                  <td className="p-2 border text-gray-800 border-gray-400 "></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-5 ml-16">
            <button
              type="submit"
              onClick={handleUpload}
              className=" text-[18px] flex flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Musak63Entry;
