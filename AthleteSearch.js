import React from "react";
import { Route } from "react-router";
import * as server from "./server";
import HandleSlider from "./HandleSlider";
import Slider, { Range } from "rc-slider";
import "react-rangeslider/lib/index.css";
import { connect } from "react-redux";
import "./AthleteSearch.css";
import InfiniteScroll from "./InfiniteScroll";
import UserDetails from "./UserDetails";

class AthleteSearchRequest extends React.Component {
  state = {
    userId: undefined,
    pageNum: 1,
    rowCount: 10,
    name: "",
    city: "",
    state: "",
    school: "",
    positions: "",
    pitchingHandedness: "",
    hittingHandedness: "",
    gradYear: "",
    gpaValue: [1.0, 4.0],
    satValue: [400, 1600],
    actValue: [1, 36],
    searchByGpa: false,
    searchBySat: false,
    searchByAct: false,
    showHittingStats: false,
    showPitchingStats: false,
    minERA: null,
    maxERA: null,
    minInnings: null,
    maxInnings: null,
    minStrikeouts: null,
    maxStrikeouts: null,
    minWalks: null,
    maxWalks: null,
    minBattingAverage: null,
    maxBattingAverage: null,
    minXBH: null,
    maxXBH: null,
    minRBI: null,
    maxRBI: null,
    minOnBasePct: null,
    maxOnBasePct: null,
    minStolenBases: null,
    maxStolenBases: null,
    loading: false,
    hasMore: false
  };

  onSearch = () => {
    this.setState(
      { userId: [], pageNum: 1, hasMore: false, loading: true },
      this.doSearch
    );
  };

  loadMore = () => {
    this.setState(
      prevState => ({ loading: true, pageNum: prevState.pageNum + 1 }),
      this.doSearch
    );
  };

  doSearch = () => {
    const { searchByAct, searchBySat, searchByGpa } = this.state;

    const minSAT = searchBySat ? this.state.satValue[0] : null;
    const maxSAT = searchBySat ? this.state.satValue[1] : null;
    const minGPA = searchByGpa ? this.state.gpaValue[0] : null;
    const maxGPA = searchByGpa ? this.state.gpaValue[1] : null;
    const minACT = searchByAct ? this.state.actValue[0] : null;
    const maxACT = searchByAct ? this.state.actValue[1] : null;

    server
      .searchResults_getAllPaged({
        pageNum: this.state.pageNum,
        rowCount: this.state.rowCount,
        name: this.state.name,
        city: this.state.city,
        state: this.state.state,
        school: this.state.school,
        gradYear: this.state.gradYear,
        positions: this.state.positions,
        pitchingHandedness: this.state.pitchingHandedness || null,
        hittingHandedness: this.state.hittingHandedness || null,
        minSAT,
        maxSAT,
        minGPA,
        maxGPA,
        minACT,
        maxACT,
        minERA: this.state.minERA,
        maxERA: this.state.maxERA,
        minInnings: this.state.minInnings,
        maxInnings: this.state.maxInnings,
        minStrikeouts: this.state.minStrikeouts,
        maxStrikeouts: this.state.maxStrikeouts,
        minWalks: this.state.minWalks,
        maxWalks: this.state.maxWalks,
        minBattingAverage: this.state.minBattingAverage,
        maxBattingAverage: this.state.maxBattingAverage,
        minXBH: this.state.minXBH,
        maxXBH: this.state.maxMBH,
        minRBI: this.state.minRBI,
        maxRBI: this.state.maxRBI,
        minOnBasePct: this.state.minOnBasePct,
        maxOnBasePct: this.state.maxOnBasePct,
        minStolenBases: this.state.minStolenBases,
        maxStolenBases: this.state.maxStolenBases
      })
      .then(response => {
        console.log(response, "good");
        if (response.data.item.ids.length === 0) {
          this.setState({ hasMore: false, loading: false });
        } else {
          this.setState({
            userId: this.state.userId.concat(response.data.item.ids),
            hasMore: true,
            loading: false
          });
          console.log(response.data.item.ids);
        }
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        <div className="athlete-input-search">
          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="Name"
              min="0"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="City"
              onChange={e => this.setState({ city: e.target.value })}
              value={this.state.city}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="State"
              onChange={e => this.setState({ state: e.target.value })}
              value={this.state.state}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control mr-10"
              placeholder="School"
              onChange={e => this.setState({ school: e.target.value })}
              value={this.state.school}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => this.onSearch()}
            >
              Search
            </button>
          </div>
        </div>

        <div className="athlete-search-option1">
          <div className="form-group">
            <input
              type="number"
              min="1990"
              className="form-control mr-15"
              placeholder="Grad Year"
              onChange={e => this.setState({ gradYear: e.target.value })}
              value={this.state.gradYear}
            />
          </div>

          <div style={{ width: "180px" }}>
            <label htmlFor="gpaScore">GPA Score:</label>
            <input
              type="checkbox"
              checked={this.state.searchByGpa}
              onChange={e => this.setState({ searchByGpa: e.target.checked })}
            />
            {this.state.searchByGpa && (
              <span>
                <br />
                <strong>min: </strong>
                {this.state.gpaValue[0]} <strong>max: </strong>
                {this.state.gpaValue[1]}
                <Range
                  name="gpaValue"
                  min={0}
                  max={4.0}
                  step={0.01}
                  value={this.state.gpaValue}
                  onChange={values => this.setState({ gpaValue: values })}
                />
              </span>
            )}
          </div>

          <div style={{ width: "180px" }}>
            <label htmlFor="satScore">SAT Score:</label>
            <input
              type="checkbox"
              checked={this.state.searchBySat}
              onChange={e => this.setState({ searchBySat: e.target.checked })}
            />
            {this.state.searchBySat && (
              <span>
                <br />
                <strong>min: </strong>
                {this.state.satValue[0]} <strong>max: </strong>
                {this.state.satValue[1]}
                <Range
                  name="satValue"
                  min={400}
                  max={1600}
                  step={1.0}
                  value={this.state.satValue}
                  onChange={values => this.setState({ satValue: values })}
                />
              </span>
            )}
          </div>

          <div style={{ width: "180px" }}>
            <label htmlFor="actScore">ACT Score:</label>
            <input
              type="checkbox"
              checked={this.state.searchByAct}
              onChange={e => this.setState({ searchByAct: e.target.checked })}
            />
            {this.state.searchByAct && (
              <span>
                <br />
                <strong>min: </strong>
                {this.state.actValue[0]} <strong>max: </strong>
                {this.state.actValue[1]}
                <Range
                  name="actValue"
                  min={1}
                  max={36}
                  step={1.0}
                  value={this.state.actValue}
                  onChange={values => this.setState({ actValue: values })}
                />
              </span>
            )}
          </div>
        </div>
        <br />

        <div className="athlete-search-option2">
          <select
            className="form-control"
            value={this.state.positions}
            onChange={e => this.setState({ positions: e.target.value })}
          >
            <option defaultValue>Choose Position</option>
            {this.props.baseballPositions.map(category => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="form-group">
            <input
              type="checkbox"
              checked={this.state.showPitchingStats}
              onChange={e =>
                this.setState({ showPitchingStats: e.target.checked })
              }
            />
            <label htmlFor="pitchingStats">Pitching Stats</label>

            {this.state.showPitchingStats && (
              <div className="athlete-search-pitching-stats">
                <span>ERA</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e => this.setState({ minERA: e.target.value })}
                  value={this.state.minERA}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e => this.setState({ maxERA: e.target.value })}
                  value={this.state.maxERA}
                />
                <span>Innings Pitched</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e => this.setState({ minInnings: e.target.value })}
                  value={this.state.minInnings}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e => this.setState({ maxInnings: e.target.value })}
                  value={this.state.maxInnings}
                />
                <span>Strikeouts</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minStrikeouts: e.target.value })
                  }
                  value={this.state.minStrikeouts}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxStrikeouts: e.target.value })
                  }
                  value={this.state.maxStrikeouts}
                />
                <span>Walks</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e => this.setState({ minWalks: e.target.value })}
                  value={this.state.minWalks}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e => this.setState({ maxWalks: e.target.value })}
                  value={this.state.maxWalks}
                />
                <span>Pitching Handedness</span>
                <select>
                  <option>Any</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              checked={this.state.showHittingStats}
              onChange={e =>
                this.setState({ showHittingStats: e.target.checked })
              }
            />
            <label htmlFor="hittingStats">Hitting Stats</label>

            {this.state.showHittingStats && (
              <div className="athlete-search-hitting-stats">
                <span>Batting Average</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minBattingAverage: e.target.value })
                  }
                  value={this.state.minBattingAverage}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxBattingAverage: e.target.value })
                  }
                  value={this.state.maxBattingAverage}
                />
                <span>XBH</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e => this.setState({ minXBH: e.target.value })}
                  value={this.state.minXBH}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e => this.setState({ maxXBH: e.target.value })}
                  value={this.state.maxXBH}
                />
                <span>RBI</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e => this.setState({ minRBI: e.target.value })}
                  value={this.state.minRBI}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e => this.setState({ maxRBI: e.target.value })}
                  value={this.state.maxRBI}
                />
                <span>On-base pct</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minOnBasePct: e.target.value })
                  }
                  value={this.state.minOnBasePct}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxOnBasePct: e.target.value })
                  }
                  value={this.state.maxOnBasePct}
                />
                <span>Stolen Bases</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minStolenBases: e.target.value })
                  }
                  value={this.state.minStolenBases}
                />
                <input
                  type="number"
                  className="form-control input-sm "
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxStolenBases: e.target.value })
                  }
                  value={this.state.maxStolenBases}
                />
                <span>Hitting Handedness</span>
                <select>
                  <option>Any</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {this.state.userId &&
          (this.state.userId.length === 0 &&
            !this.state.hasMore &&
            !this.state.loading ? (
              <div>No results found</div>
            ) : (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel">
                      <div className="panel-heading">
                        <div className="pull-left" style={{ height: "30px" }}>
                          <h3 className="panel-title">Search Results</h3>
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="panel-body no-padding">
                        <div
                          className="table-responsive"
                          style={{ marginTop: "-1px" }}
                        >
                          <table className="table table-default">
                            <thead>
                              <tr>
                                <th
                                  className="text-center"
                                  style={{ width: "12%" }}
                                >
                                  Name
                              </th>
                                <th
                                  className="text-center"
                                  style={{ width: "5%" }}
                                >
                                  UserId
                              </th>
                                <th className="text-center">Location</th>
                                <th className="text-center">User Type</th>
                                <th className="text-center">Rating</th>
                                <th
                                  className="text-center"
                                  style={{ width: "12%" }}
                                >
                                  Expand
                              </th>
                              </tr>
                            </thead>
                            {this.state.userId.map(el => (
                              <UserDetails key={el} userId={el} />
                            ))}
                          </table>
                          {loading &&
                            !this.state.hasMore && (
                              <h4>
                                <i className="fa fa-spinner fa-spin" />Loading...
                            </h4>
                            )}
                          {this.state.hasMore &&
                            (loading ? (
                              <h4>
                                <i className="fa fa-spinner fa-spin" />Loading...
                            </h4>
                            ) : (
                                <InfiniteScroll
                                  onVisible={() => {
                                    console.log("visible!");
                                    this.loadMore();
                                  }}
                                />
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  let positions = [];
  if (state.lookupData && state.lookupData.BaseballPositions) {
    positions = state.lookupData.BaseballPositions;
  }

  return {
    baseballPositions: positions
  };
}

export default connect(mapStateToProps)(AthleteSearchRequest);
