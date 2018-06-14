import React from "react";
import * as server from "./server";
import ConferenceChooser from "./ConferenceChooser";
import "./SchoolsSearch.css";
import InfiniteScroll from "./InfiniteScroll";
import UserDetails from "./UserDetails";

class SchoolsSearch extends React.Component {
  state = {
    userId: undefined,
    pageNum: 1,
    rowCount: 10,
    schoolName: "",
    city: "",
    state: "",
    conference: "",
    division: "",
    showSchoolsStats: false,
    minAverageGameWon: null,
    maxAverageGameWon: null,
    minAverageAcceptanceRate: null,
    maxAverageAcceptanceRate: null,
    minYearsInPlayoffs: null,
    maxYearsInPlayoffs: null,
    conferenceChampionshipPast10Yrs: "",
    previousSeasonRecord: "",
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
    server
      .searchResults_getAllSchools({
        pageNum: this.state.pageNum,
        rowCount: this.state.rowCount,
        schoolName: this.state.schoolName,
        city: this.state.city,
        state: this.state.state,
        school: this.state.school,
        division: this.state.division,
        conference: this.state.conference,
        showSchoolsStats: this.state.showSchoolsStats,
        minAverageGameWon: this.state.minAverageGameWon,
        maxAverageGameWon: this.state.maxAverageGameWon,
        minYearsInPlayoffs: this.state.minYearsInPlayoffs,
        maxYearsInPlayoffs: this.state.maxYearsInPlayoffs,
        minAverageAcceptanceRate: this.state.minAverageAcceptanceRate,
        maxAverageAcceptanceRate: this.state.maxAverageAcceptanceRate,
        previousSeasonRecord: this.state.previousSeasonRecord,
        conferenceChampionshipPast10Yrs:
          this.state.conferenceChampionshipPast10Yrs || null
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
        <div className="schools-input-search">
          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="School Name"
              onChange={e => this.setState({ schoolName: e.target.value })}
              value={this.state.schoolName}
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
            <select
              className="form-control mr-15"
              value={this.state.previousSeasonRecord}
              onChange={e =>
                this.setState({ previousSeasonRecord: e.target.value })
              }
            >
              <option defaultValue>Previous Season Record</option>
              <option value="DI">Win</option>
              <option value="DII">Loss</option>
              <option value="DIII">Tie</option>
            </select>
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

        <div className="conferenceChampionshipPast10Yrs">
          Conference championships in the last 10 years?{" "}
          <label className="mr-10">
            <input
              type="checkbox"
              checked={this.state.conferenceChampionshipPast10Yrs}
              onChange={e =>
                this.setState({
                  conferenceChampionshipPast10Yrs: e.target.checked
                })
              }
            />{" "}
            Yes
          </label>
        </div>

        <div className="schools-search-option">
          <div className="form-group">
            <select
              className="form-control mr-15"
              value={this.state.division}
              onChange={e => this.setState({ division: e.target.value })}
            >
              <option defaultValue>Divisions</option>
              <option value="DI">DI</option>
              <option value="DII">DII</option>
              <option value="DIII">DIII</option>
              <option value="NAIA">NAIA</option>
            </select>
          </div>

          <div>
            <ConferenceChooser
              placeholder="Conference"
              value={this.state.conference}
              onChange={value => this.setState({ conference: value })}
            />
            {this.state.conference}
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              checked={this.state.showSchoolsStats}
              onChange={e =>
                this.setState({ showSchoolsStats: e.target.checked })
              }
            />
            <label htmlFor="schoolsStats">Schools Stats</label>

            {this.state.showSchoolsStats && (
              <div className="schools-stats">
                <span>Average Game Won</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minAverageGameWon: e.target.value })
                  }
                  value={this.state.minAverageGameWon}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxAverageGameWon: e.target.value })
                  }
                  value={this.state.maxAverageGameWon}
                />
                <span>Years in Playoffs</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minYearsInPlayoffs: e.target.value })
                  }
                  value={this.state.minYearsInPlayoffs}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxYearsInPlayoffs: e.target.value })
                  }
                  value={this.state.maxYearsInPlayoffs}
                />
                <span>Average Acceptance Rate</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minAverageAcceptanceRate: e.target.value })
                  }
                  value={this.state.minAverageAcceptanceRate}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxAverageAcceptanceRate: e.target.value })
                  }
                  value={this.state.maxAverageAcceptanceRate}
                />
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
                    <div className="panel-heading bg-primary">
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

export default SchoolsSearch;
