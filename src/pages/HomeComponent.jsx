import React from "react";
import ApiHandler from "../utils/ApiHandler";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  state = {
    customer_request: 0,
    bill_count: 0,
    total_medicine: 0,
    total_company: 0,
    total_employee: 0,
    total_profit: 0,
    total_sell: 0,
    customer_request_pending: 0,
    customer_request_completed: 0,
    total_profit_today: 0,
    total_sell_today: 0,
    medicine_expire_in_week: 0,
    dataPoints: [],
    profit_chart_option: {},
    sell_chart_option: {},
  };
  // This method work when our page is ready
  componentDidMount() {
    this.fetchHomePageData();
  }

  async fetchHomePageData() {
    this.updateDataAgain();
    this.setState({
      dataLoaded: true,
    });
  }

  async updateDataAgain() {
    var apiHandler = new ApiHandler();
    var homeData = await apiHandler.fetchHomeApiData();
    console.log(homeData);
    this.setState({
      customer_request: homeData.data.customer_request,
      bill_count: homeData.data.bill_count,
      total_medicine: homeData.data.total_medicine,
      total_company: homeData.data.total_company,
      total_employee: homeData.data.total_employee,
      total_profit: homeData.data.total_profit,
      total_sell: homeData.data.total_sell,
      customer_request_pending: homeData.data.customer_request_pending,
      customer_request_completed: homeData.data.customer_request_completed,
      total_sell_today: homeData.data.total_sell_today,
      total_profit_today: homeData.data.total_profit_today,
      medicine_expire_in_week: homeData.data.medicine_expire_in_week,
    });

    // Chart
    var profitDataList = [];
    for (var i = 0; i < homeData.data.profit_chart.length; i++) {
      profitDataList.push({
        x: new Date(homeData.data.profit_chart[i].date),
        y: homeData.data.profit_chart[i].amt,
      });
    }
    this.state.profit_chart_option = {
      animationEnabled: true,
      title: {
        text: "Total Profit Chart of Medicine",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Profit",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: profitDataList,
        },
      ],
    };

    var sellDataList = [];
    for (var i = 0; i < homeData.data.sell_chart.length; i++) {
      sellDataList.push({
        x: new Date(homeData.data.sell_chart[i].date),
        y: homeData.data.sell_chart[i].amt,
      });
    }
    this.state.sell_chart_option = {
      animationEnabled: true,
      title: {
        text: "Total Sell Chart of Medicine",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Profit",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: sellDataList,
        },
      ],
    };
    this.setState({});
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>DASHBOARD</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">feedback</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.customer_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">bookmark</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.bill_count}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">equalizer</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL MEDICINE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_medicine}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">work</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL COMPANY</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">person_add</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL EMPLOYEE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.total_employee}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">attach_money</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_profit}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">payment</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_sell}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">warning</i>
                </div>
                <div className="content">
                  <div className="text">MEDICINE EXPIRE IN WEEK</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicine_expire_in_week}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="content">
                  <div className="text">COMPLETED REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.customer_request_completed}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">help</i>
                </div>
                <div className="content">
                  <div className="text">PENDING REQUEST</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.customer_request_pending}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">payment</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_sell_today}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">attach_money</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.total_profit_today}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Profit Chart</h2>
                </div>
                <div className="body"></div>
                <CanvasJSChart options={this.state.profit_chart_option} />
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Sell Chart</h2>
                </div>
                <div className="body"></div>
                <CanvasJSChart options={this.state.sell_chart_option} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default HomeComponent;
