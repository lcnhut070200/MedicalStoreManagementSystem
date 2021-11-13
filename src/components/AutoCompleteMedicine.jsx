import React from "react";
import ApiHandler from "../utils/ApiHandler";

class AutoCompleteMedicine extends React.Component {
  state = {
    onFocus: false,
    medicineList: [],
  };

  constructor(props) {
    super(props);
    this.loadDataMedicine = this.loadDataMedicine.bind(this);
    this.inputData = React.createRef();
  }
  onFocusChange = () => {
    this.setState({ onFocus: true });
  };

  onBlurChange = () => {
    this.setState({ onFocus: false });
  };

  async loadDataMedicine(e) {
    var apiHandler = new ApiHandler();
    var dataResponse = await apiHandler.fetchMedicineByName(e.target.value);
    this.setState({ medicineList: dataResponse.data });
  }

  onShowItem = (medicine) => {
    this.inputData.current.value = medicine.name;
    this.props.showDataInInput(this.props.itemPosition, medicine);
    this.onBlurChange();
  };

  render() {
    return (
      <>
        <input
          type="text"
          id="medicine_name"
          name="medicine_name"
          className="form-control"
          placeholder="Enter medicine name"
          onFocus={this.onFocusChange}
          autoComplete="off"
          onChange={this.loadDataMedicine}
          ref={this.inputData}
        />

        {this.state.onFocus === true ? (
          <div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey",
                position: "absolute",
                width: "100%",
                zIndex: 1,
                background: "white",
              }}
            >
              {this.state.medicineList.map((medicine, index) => (
                <li
                  key={index}
                  style={{
                    padding: "5px",
                    borderBottom: "1px solid lightgrey",
                  }}
                  onClick={() => this.onShowItem(medicine)}
                >
                  {medicine.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default AutoCompleteMedicine;
