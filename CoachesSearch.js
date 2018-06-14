import React from "react";
import * as server from "./server";
import ConferenceChooser from "./ConferenceChooser";
import "./CoachesSearch.css";
import InfiniteScroll from "./InfiniteScroll";
import UserDetails from "./UserDetails";
import { UserProfileCard } from "./UserProfileCard";

class CoachSearch extends React.Component {
  componentDidMount() {
    this.onSearch();
  }
  state = {
    userId: undefined,
    pageNum: 1,
    rowCount: 10,
    name: "",
    city: "",
    state: "",
    school: "",
    coachDivision: "",
    coachConference: "",
    showCoachesStats: false,
    minCoachAverageGameWon: null,
    maxCoachAverageGameWon: null,
    minCoachYearsInPlayoffs: null,
    maxCoachYearsInPlayoffs: null,
    coachRoles: "",
    coachConferenceWithin10Yrs: "",
    loading: false,
    hasMore: false
  };

  onSearch = () => {
    this.setState(
      { userId: [], pageNum: 1, hasMore: false, loading: true },
      () => this.doSearch()
    );
  };

  loadMore = () => {
    this.setState(
      prevState => ({ loading: true, pageNum: prevState.pageNum + 1 }),
      () => this.doSearch()
    );
  };

  doSearch = () => {
    console.log(this.state);
    server
      .searchResultsCoaches_getAllPaged({
        pageNum: this.state.pageNum,
        rowCount: this.state.rowCount,
        name: this.state.name,
        city: this.state.city,
        state: this.state.state,
        school: this.state.school,
        coachDivision: this.state.coachDivision,
        coachConference: this.state.coachConference,
        showCoachesStats: this.state.showCoachesStats,
        minCoachAverageGameWon: this.state.minCoachAverageGameWon,
        maxCoachAverageGameWon: this.state.maxCoachAverageGameWon,
        minCoachYearsInPlayoffs: this.state.minCoachYearsInPlayoffs,
        maxCoachYearsInPlayoffs: this.state.maxCoachYearsInPlayoffs,
        coachRoles: this.state.coachRoles,
        coachConferenceWithin10Yrs:
          this.state.coachConferenceWithin10Yrs || null
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
        <div className="coaches-input-search">
          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="Name"
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

        <div className="coachConferenceWithin10Yrs">
          Conference championships in the last 10 years?{" "}
          <label className="mr-10">
            <input
              type="checkbox"
              checked={this.state.coachConferenceWithin10Yrs}
              onChange={e =>
                this.setState({ coachConferenceWithin10Yrs: e.target.checked })
              }
            />{" "}
            Yes
          </label>
        </div>

        <div className="coaches-search-option">
          <div className="form-group">
            <input
              type="text"
              className="form-control mr-15"
              placeholder="Title/Roles"
              onChange={e => this.setState({ coachRoles: e.target.value })}
              value={this.state.coachRoles}
            />
          </div>

          <div className="form-group">
            <select
              className="form-control mr-15"
              value={this.state.coachDivision}
              onChange={e => this.setState({ coachDivision: e.target.value })}
            >
              <option value="">Divisions</option>
              <option value="DI">DI</option>
              <option value="DII">DII</option>
              <option value="DIII">DIII</option>
              <option value="NAIA">NAIA</option>
            </select>
          </div>

          <div>
            <ConferenceChooser
              placeholder="Conference"
              value={this.state.coachConference}
              onChange={value => this.setState({ coachConference: value })}
            />
            {this.state.coachConference}
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              checked={this.state.showCoachesStats}
              onChange={e =>
                this.setState({ showCoachesStats: e.target.checked })
              }
            />
            <label htmlFor="coachesStats">Coaches Stats</label>

            {this.state.showCoachesStats && (
              <div className="coaches-stats">
                <span>Average Game Won</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minCoachAverageGameWon: e.target.value })
                  }
                  value={this.state.minCoachAverageGameWon}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxCoachAverageGameWon: e.target.value })
                  }
                  value={this.state.maxCoachAverageGameWon}
                />
                <span>Years in Playoffs</span>
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="min"
                  onChange={e =>
                    this.setState({ minCoachYearsInPlayoffs: e.target.value })
                  }
                  value={this.state.minCoachYearsInPlayoffs}
                />
                <input
                  type="number"
                  className="form-control input-sm"
                  min="0"
                  placeholder="max"
                  onChange={e =>
                    this.setState({ maxCoachYearsInPlayoffs: e.target.value })
                  }
                  value={this.state.maxCoachYearsInPlayoffs}
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
                        <div className="row">
                          {this.state.userId.map(el => (
                            <UserProfileCard key={el} userId={el} />
                          ))}
                        </div>
                        {/* </table> */}
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

export default CoachSearch;
