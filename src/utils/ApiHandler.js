import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

import AuthHandler from "./AuthHandler";
import Config from "./Config";

class ApiHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry()) {
      try {
        var response = await axios.post(Config.refreshApiUrl, {
          refresh: AuthHandler.getRefreshToken(),
        });
        reactLocalStorage.set("token", response.data.access);
      } catch (error) {
        console.log(error);

        // not using valid token for refresh
        AuthHandler.logoutUser();
        window.location = "/";
      }
    }
  }

  // Company
  async saveCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchAllCompany() {
    await this.checkLogin();

    var response = await axios.get(Config.companyApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async fetchCompanyDetails(id) {
    await this.checkLogin();

    var response = await axios.get(Config.companyApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    id
  ) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.put(
      Config.companyApiUrl + "" + id + "/",
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async saveCompanyBankData(bank_account_no, ifsc_no, company_id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.companyBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchCompanyBankDetails(id) {
    await this.checkLogin();

    var response = await axios.get(Config.companyBankApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editCompanyBankData(bank_account_no, ifsc_no, company_id, id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.put(
      Config.companyBankApiUrl + "" + id + "/",
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchCompanyOnly() {
    await this.checkLogin();

    var response = await axios.get(Config.companyOnlyApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async fetchAllCompanyAccount() {
    await this.checkLogin();

    var response = await axios.get(Config.companyAccountApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async saveCompanyTransactionData(
    company_id,
    transaction_type,
    transaction_amt,
    transaction_date,
    payment_mode
  ) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.companyAccountApiUrl,
      {
        company_id: company_id,
        transaction_type: transaction_type,
        transaction_amt: transaction_amt,
        transaction_date: transaction_date,
        payment_mode: payment_mode,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  // Meicine
  async saveMedicineData(
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicineDetails
  ) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.medicineApiUrl,
      {
        name: name,
        medical_typ: medical_typ,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicineDetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchAllMedicine() {
    await this.checkLogin();

    var response = await axios.get(Config.medicineApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editMedicineData(
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicineDetails,
    id
  ) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.put(
      Config.medicineApiUrl + id + "/",
      {
        name: name,
        medical_typ: medical_typ,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicineDetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchMedicineByName(name) {
    if (name !== "") {
      await this.checkLogin();

      var response = await axios.get(Config.meidicneByNameApiUrl + "" + name, {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      });

      return response;
    } else {
      return {
        data: [],
      };
    }
  }

  // Employee
  async saveEmployee(name, joining_date, phone, address) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.employeeApiUrl,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchAllEmployee() {
    await this.checkLogin();

    var response = await axios.get(Config.employeeApiUrl, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async fetchEmployeeByID(id) {
    await this.checkLogin();

    var response = await axios.get(Config.employeeApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async editEmployee(name, joining_date, phone, address, id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.put(
      Config.employeeApiUrl + "" + id + "/",
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  // Emloyee Salary
  async fetchEmpSalary(id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.get(Config.employeeSalaryBydIDApiUrl + "" + id, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  async saveEmpSalary(salary_date, salary_amount, employee_id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.employeeSalaryApiUrl,
      {
        salary_date: salary_date,
        salary_amount: salary_amount,
        employee_id: employee_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async saveEmpBank(bank_account_no, ifsc_no, employee_id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.employeeBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        employee_id: employee_id,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }

  async fetchEmpBank(id) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.get(Config.employeeBankBydIDApiUrl + "" + id, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });

    return response;
  }

  // Bill
  async generateBill(customer_name, address, phone, medicineDetails) {
    await this.checkLogin();
    // Wait until token get updated

    var response = await axios.post(
      Config.generateBillApiUrl,
      {
        name: customer_name,
        address: address,
        contact_no: phone,
        medicine_details: medicineDetails,
      },
      { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
    );

    return response;
  }
}

export default ApiHandler;
