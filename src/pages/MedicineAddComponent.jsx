import React from "react";
import { Link } from "react-router-dom";
import ApiHandler from "../utils/ApiHandler";

class MedicineAddComponent extends React.Component {
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
    medicineDetails: [
      {
        salt_name: "",
        salt_qty: "",
        salt_qty_type: "",
        detailsDescription: "",
      },
    ],
  };

  async formSubmit(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });

    var apiHandler = new ApiHandler();
    var response = await apiHandler.saveMedicineData(
      e.target.name.value,
      e.target.medical_typ.value,
      e.target.buy_price.value,
      e.target.sell_price.value,
      e.target.gst.value,
      e.target.batch_no.value,
      e.target.shelf_no.value,
      e.target.expire_date.value,
      e.target.mfg_date.value,
      e.target.company_id.value,
      e.target.description.value,
      e.target.in_stock_total.value,
      e.target.qty_in_strip.value,
      this.state.medicineDetails
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
    this.LoadCompany();
  }

  async LoadCompany() {
    var apiHandler = new ApiHandler();
    var companyData = await apiHandler.fetchCompanyOnly();
    this.setState({
      companyList: companyData.data,
    });
  }

  addItem = () => {
    var item = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      detailsDescription: "",
    };
    this.state.medicineDetails.push(item);
    this.setState({});
  };

  removeItem = () => {
    if (this.state.medicineDetails.length !== 1) {
      this.state.medicineDetails.pop(this.state.medicineDetails.length - 1);
    }
    this.setState({});
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
            <h2>ADD MEDICINE</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>ADD MEDICINE</h2>
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
                        />
                      </div>
                    </div>
                    <label htmlFor="gst">GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="gst"
                          name="gst"
                          className="form-control"
                          placeholder="Enter GST"
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
                          <option key={item.id} value={item.id}>
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
                        ? "Add medicine"
                        : "Adding medicine please wait..."}
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
export default MedicineAddComponent;
