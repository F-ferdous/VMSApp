import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./page/Header";
import Footer from "./page/Footer";
import MainPart from "./page/MainPart";

import CustomerEntry from "./functions/CustomerEntry";
import CustomerView from "./functions/CustomerView";
import ProducEntry from "./functions/ProducEntry";
import ProductView from "./functions/ProductView";
import SupplierEntry from "./functions/SupplierEntry"; //supplier entry page
import SupplierView from "./functions/SupplierView"; // supplier view page
import ProductCategory from "./dropdownEntry/ProductCategory";
import UomEntry from "./dropdownEntry/UomEntry";
import DeclarationEntry from "./dropdownEntry/DeclarationEntry";
import Musak65Entry from "./functions/Musak65Entry";
import Musak65Reports from "./functions/Musak65Reports";
import Musak65 from "./reports/Musak65";
import Musak63Entry from "./functions/Musak63Entry";
import Musak63Reports from "./functions/Musak63Reports";
import Musak63 from "./reports/Musak63";
import Report61entry from "./functions/Report61entry";
import Musak61 from "./reports/Musak61";
import Login from "./admin/Login";

import { useStateContext } from "./contexts/ContextProvider";
import AddUser from "./admin/AddUser";
import AddDetails from "./admin/AddDetails";
import TransferTo from "./functions/TransferTo";
import TransferToDetails from "./functions/TransferToDetails";
import Musak61Search from "./functions/Musak61Search";

function App() {
  const { user } = useStateContext();
  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<MainPart />} />
            <Route path="/CustomerEntry" element={<CustomerEntry />} />
            <Route path="/CustomerView" element={<CustomerView />} />
            <Route path="/TransferTo" element={<TransferTo />} />
            <Route path="/TransferDetails" element={<TransferToDetails />} />
            <Route path="/ProductEntry" element={<ProducEntry />} />
            <Route path="/ProductView" element={<ProductView />} />
            <Route path="/SupplierEntry" element={<SupplierEntry />} />
            <Route path="/SupplierView" element={<SupplierView />} />
            <Route path="/ProductCategoryEntry" element={<ProductCategory />} />
            <Route path="/UomEntry" element={<UomEntry />} />
            <Route path="/DeclarationEntry" element={<DeclarationEntry />} />
            <Route path="/ProductTransferEntry" element={<Musak65Entry />} />
            <Route path="/SalesEntry" element={<Musak63Entry />} />
            <Route path="/6.1Entry" element={<Report61entry />} />
            <Route path="/SalesEntryList" element={<Musak63Reports />} />
            <Route path="/ProductTransferList" element={<Musak65Reports />} />
            <Route
              path="/ProductTransferReportView/:id"
              element={<Musak65 />}
            />
            <Route path="/SalesEntryReportView/:id" element={<Musak63 />} />
            <Route path="/Musak6.1Reports" element={<Musak61 />} />
            {/* ß */}
            <Route path="/login" element={<Login />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/addDetails" element={<AddDetails />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
