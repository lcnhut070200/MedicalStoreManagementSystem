import React from "react";
import { Link } from "react-router-dom";
import ApiHandler from "../utils/ApiHandler";

class MedicineManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyList: [],
    dataLoaded: false,

    medicineDetails: [],
    medicineDataList: [],
    name: "",
    medical_typ: "",
    buy_price: "",
    sell_price: "",
    c_gst: "",
    s_gst: "",
    batch_no: "",
    shelf_no: "",
    expire_date: "",
    mfg_date: "",
    company_id: "",
    description: "",
    in_stock_total: "",
    qty_in_strip: "",
    total_salt_list: 0,
    medicie_id: 0,
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new ApiHandler();
    var response = await apiHandler.editMedicineData(
      e.target.name.value,
      e.target.medical_typ.value,
      e.target.buy_price.value,
      e.target.sell_price.value,
      e.target.c_gst.value,
      e.target.s_gst.value,
      e.target.batch_no.value,
      e.target.shelf_no.value,
      e.target.expire_date.value,
      e.target.mfg_date.value,
      e.target.company_id.value,
      e.target.description.value,
      e.target.in_stock_total.value,
      e.target.qty_in_strip.value,
      this.state.medicineDetails,
      this.state.medicie_id
    );

    console.log(response);
    this.setState({
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true,
    });
  }

  componentDidMount() {
    this.LoadInitialData();
  }

  async LoadInitialData() {
    var apiHandler = new ApiHandler();
    var companyData = await apiHandler.fetchCompanyOnly();
    var medicineData = await apiHandler.fetchAllMedicine();
    this.setState({
      companyList: companyData.data,
      medicineDataList: medicineData.data.data,
      dataLoaded: true,
    });
  }

  addItem = () => {
    var item = {
      id: 0,
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      detailsDescription: "",
    };
    this.state.medicineDetails.push(item);
    this.setState({});
  };

  removeItem = () => {
    if (this.state.medicineDetails.length !== this.state.total_salt_list) {
      this.state.medicineDetails.pop(this.state.medicineDetails.length - 1);
    }
    this.setState({});
  };

  viewMedicineDetails = (index) => {
    this.setState({
      medicie_id: this.state.medicineDataList[index].id,
      name: this.state.medicineDataList[index].name,
      medical_typ: this.state.medicineDataList[index].medical_typ,
      buy_price: this.state.medicineDataList[index].buy_price,
      sell_price: this.state.medicineDataList[index].sell_price,
      c_gst: this.state.medicineDataList[index].c_gst,
      s_gst: this.state.medicineDataList[index].s_gst,
      batch_no: this.state.medicineDataList[index].batch_no,
      shelf_no: this.state.medicineDataList[index].shelf_no,
      expire_date: this.state.medicineDataList[index].expire_date,
      mfg_date: this.state.medicineDataList[index].mfg_date,
      company_id: this.state.medicineDataList[index].company_id,
      description: this.state.medicineDataList[index].description,
      in_stock_total: this.state.medicineDataList[index].in_stock_total,
      qty_in_strip: this.state.medicineDataList[index].qty_in_strip,
      medicineDetails: this.state.medicineDataList[index].medicine_details,
      total_salt_list:
        this.state.medicineDataList[index].medicine_details.length,
    });
  };

  handleInput = (e) => {
    var keyname = e.target.name;
    var value = e.target.value;
    var index = e.target.getAttribute("data-index");
    this.state.medicineDetails[index][keyname] = value;
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE MEDICINE</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div class="preloader pl-size-xl">
                        <div class="spinner-layer">
                          <div class="circle-clipper left">
                            <div class="circle"></div>
                          </div>
                          <div class="circle-clipper right">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>ALL MEDICINES</h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Medical type</th>
                        <th>Buy price</th>
                        <th>Sell price</th>
                        {/* <th>C GST</th>
                        <th>S GST</th> */}
                        <th>Batch no</th>
                        <th>Shelf no</th>
                        <th>Expire date</th>
                        <th>Mfg date</th>
                        {/* <th>Description</th> */}
                        <th>In stock</th>
                        <th>Company</th>
                        <th>Added on</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.medicineDataList.map((medicine, index) => (
                        <tr key={medicine.id}>
                          <td>{medicine.id}</td>
                          <td>{medicine.name}</td>
                          <td>{medicine.medical_typ}</td>
                          <td>{medicine.buy_price}</td>
                          <td>{medicine.sell_price}</td>
                          {/* <td>{medicine.c_gst}</td>
                          <td>{medicine.s_gst}</td> */}
                          <td>{medicine.batch_no}</td>
                          <td>{medicine.shelf_no}</td>
                          <td>{medicine.expire_date}</td>
                          <td>{medicine.mfg_date}</td>
                          {/* <td>{medicine.description}</td> */}
                          <td>{medicine.in_stock_total}</td>
                          <td>{medicine.company.name}</td>
                          <td>
                            {new Date(medicine.added_on).toLocaleString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.viewMedicineDetails(index)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>MANAGE MEDICINE</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter name"
                          defaultValue={this.state.name}
                        />
                      </div>
                    </div>
                    <label htmlFor="medical_typ">Medical type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_typ"
                          name="medical_typ"
                          className="form-control"
                          placeholder="Enter medical type"
                          defaultValue={this.state.medical_typ}
                        />
                      </div>
                    </div>
                    <label htmlFor="buy_price">Buy price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Enter buy price"
                          defaultValue={this.state.buy_price}
                        />
                      </div>
                    </div>
                    <label htmlFor="sell_price">Sell price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Enter buy price"
                          defaultValue={this.state.sell_price}
                        />
                      </div>
                    </div>
                    <label htmlFor="c_gst">C GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="Enter C-GST"
                          defaultValue={this.state.c_gst}
                        />
                      </div>
                    </div>
                    <label htmlFor="s_gst">S GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="Enter S-GST"
                          defaultValue={this.state.s_gst}
                        />
                      </div>
                    </div>
                    <label htmlFor="batch_no">Batch no</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="Enter Batch number"
                          defaultValue={this.state.batch_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="shelf_no">Shelf no</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Enter Shelf number"
                          defaultValue={this.state.shelf_no}
                        />
                      </div>
                    </div>
                    <label htmlFor="expire_date">Expire date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          defaultValue={this.state.expire_date}
                        />
                      </div>
                    </div>
                    <label htmlFor="mfg_date">MFG date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          defaultValue={this.state.mfg_date}
                        />
                      </div>
                    </div>
                    <label htmlFor="description">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter description"
                          defaultValue={this.state.description}
                        />
                      </div>
                    </div>
                    <label htmlFor="in_stock_total">In stock total</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="Enter in stock total"
                          defaultValue={this.state.in_stock_total}
                        />
                      </div>
                    </div>
                    <label htmlFor="qty_in_strip">Qty in strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="Enter qty_in_strip"
                          defaultValue={this.state.qty_in_strip}
                        />
                      </div>
                    </div>
                    <label htmlFor="company">Company</label>
                    <div className="form-group">
                      <select
                        className="form-control show-tick"
                        name="company_id"
                        id="company_id"
                      >
                        {this.state.companyList.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            selected={
                              item.id === this.state.company_id ? true : false
                            }
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.addItem}
                          type="button"
                        >
                          Add details
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-danger"
                          onClick={this.removeItem}
                          type="button"
                        >
                          Remove details
                        </button>
                      </div>
                    </div>

                    {this.state.medicineDetails.map((item, index) => (
                      <div key={index} className="form-group row">
                        <div className="col-lg-3">
                          <label htmlFor="salt_name">Salt name</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_name"
                              name="salt_name"
                              className="form-control"
                              placeholder="Enter salt name"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_name}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="salt_qty">Salt qty</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty"
                              name="salt_qty"
                              className="form-control"
                              placeholder="Enter salt qty"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_qty}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="salt_qty_type">Salt qty type</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty_type"
                              name="salt_qty_type"
                              className="form-control"
                              placeholder="Enter salt qty type"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.salt_qty_type}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <label htmlFor="detailsDescription">
                            Description
                          </label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="detailsDescription"
                              name="detailsDescription"
                              className="form-control"
                              placeholder="Enter description"
                              onChange={this.handleInput}
                              data-index={index}
                              defaultValue={item.detailsDescription}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Update medicine"
                        : "Updating medicine please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Failed!</strong> {this.state.errorMessage}.
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default MedicineManageComponent;
