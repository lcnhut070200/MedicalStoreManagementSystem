class Config {
  static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
  static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";

  // Company
  static companyApiUrl = "http://127.0.0.1:8000/api/company/";
  static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/";
  static companyAccountApiUrl = "http://127.0.0.1:8000/api/companyaccount/";
  static companyOnlyApiUrl = "http://127.0.0.1:8000/api/companyonly/";

  // Medicine
  static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/";
  static employeeApiUrl = "http://127.0.0.1:8000/api/employee/";

  // Employee salary
  static employeeSalaryBydIDApiUrl =
    "http://127.0.0.1:8000/api/employee_salary_byid/";
  static employeeSalaryApiUrl =
    "http://127.0.0.1:8000/api/employee_all_salary/";

  static employeeBankApiUrl = "http://127.0.0.1:8000/api/employee_all_bank/";
  static employeeBankBydIDApiUrl =
    "http://127.0.0.1:8000/api/employee_bank_byid/";

  static homeUrl = "/home";
  static logoutPageUrl = "/logout";

  static sidebarItem = [
    { index: "0", title: "Home", url: "/home", icons: "home" },
    { index: "1", title: "Company", url: "/company", icons: "assessment" },
    {
      index: "2",
      title: "Add Medicine",
      url: "/addMedicine",
      icons: "assessment",
    },
    {
      index: "3",
      title: "Manage Medicine",
      url: "/manageMedicine",
      icons: "assessment",
    },
    {
      index: "4",
      title: "Manage Company Account",
      url: "/manageCompanyAccount",
      icons: "assessment",
    },

    {
      index: "5",
      title: "Manage Employee",
      url: "/manageEmployee",
      icons: "assessment",
    },
  ];
}
export default Config;
