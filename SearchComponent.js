import React from 'react';
import * as server from './server';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SearchComponent extends React.Component {
    state = {
        searchResults: [],
        searchText: '',
        defaultPage: 1,
        defaultCount: 5,
        count: 5,
        total: '',
        pages: 0
    };

    componentDidMount() {
        if (this.props.page) {
            server.searchResults_getAllPaged(this.props.searchText, this.props.page, this.props.count)
                .then(response => {
                    let searchText = this.props.searchText;
                    let count = this.props.count;
                    let pages = Math.ceil(response.data.item.total / count);
                    this.setState({ searchText: this.props.searchText, searchResults: response.data.item.searchResults, total: response.data.item.total, pages, count: this.props.count },
                        () => {
                            if (this.props.page > this.state.pages) {
                                this.props.history.replace(this.props.location.pathname + '?input=' + this.props.searchText + '&page=1&count=' + this.props.count);
                            }
                        }
                    );
                })
                .catch(error => {
                    console.log(error);
                    alert('There was an error retrieving search data.');
                })
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props, prevProps);
        if (this.props.searchText != prevProps.searchText || this.props.page != prevProps.page || this.props.count != prevProps.count) {
            // this.setState({ loading: true });
            console.log('hello');
            server.searchResults_getAllPaged(this.props.searchText, this.props.page, this.props.count)
                .then(response => {
                    let searchText = this.props.searchText;
                    let count = this.props.count;
                    let pages = Math.ceil(response.data.item.total / count);
                    this.setState({ searchText: this.props.searchText, searchResults: response.data.item.searchResults, total: response.data.item.total, pages, count: this.props.count });
                })
                .catch(error => {
                    console.log(error);
                    alert('There was an error retrieving search data.');
                })
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.replace(this.props.location.pathname + '?input=' + this.state.searchText + '&page=1&count=' + this.state.count);
    }


    paginate = () => {
        let pages = [];

        for (let i = 0; i < this.state.pages; i++) {
            pages.push(
                <li key={i} className={i + 1 == this.state.page ? "paginate_button active" : "paginate_button"}
                    aria-controls="datatable-sample"
                    tabIndex="0">
                    <Link to={'/searchresults?input=' + this.props.searchText + '&page=' + (i + 1) + '&count=' + (this.props.count || 5)}>{i + 1}</Link>
                </li >
            )
        }
        return pages;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <form>
                        <div className="form-horizontal">
                            <div className="form-group has-feedback">
                                <div className="col-sm-5">

                                    <input className="form-control"
                                        type="text"
                                        value={this.state.searchText}
                                        onChange={e => this.setState({ searchText: e.target.value })}
                                        placeholder="Search messages..." />

                                    <button
                                        style={{ marginRight: "10px" }}
                                        type="submit"
                                        className="btn btn-theme fa fa-search form-control-feedback rounded"
                                        onClick={this.handleClick}>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8"></div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="col-md-6">
                                    <input className="form-control" id="count" type="text"
                                        onChange={
                                            (e) => {
                                                /^\d+$/.test(e.target.value) & Number(e.target.value) <= 100
                                                    &&
                                                    this.setState({ count: e.target.value })
                                            }}
                                        value={this.state.count}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Link
                                        type="button"
                                        to={'/searchresults?input=' + this.state.searchText + '&page=' + (this.props.page ? this.props.page : this.state.defaultPage) + "&count=" + this.state.count}
                                        className="btn btn-success"
                                    >></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.searchResults.length > 0 &&

                        <div className="table-responsive mb-20 mt-20">
                            <table className="table table-bordered">
                                <tbody>
                                    {
                                        this.state.searchResults.map((result, index) =>
                                            <tr key={index}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>{result.userId}</td>
                                                <td>{result.fullName}</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    }

                    <div className="dataTables_paginate paging_full_numbers_no_ellipses" id="datatable-sample_paginate" style={{ "float": "right" }}>
                        <ul className="pagination">
                            <li className="paginate_button first" aria-controls="datatable-sample" tabIndex="0" id="datatable-sample_first">
                                <Link to={'/searchresults?input=' + this.props.searchText + '&page=1&count=' + (this.props.count || this.state.defaultCount)}>First</Link>
                            </li>
                            <li className="paginate_button previous" aria-controls="datatable-sample" tabIndex="0" id="datatable-sample_previous">
                                <Link to={'/searchresults?input=' + this.props.searchText + '&page=' + (this.props.page - 1 || this.state.defaultPage) + '&count=' + (this.props.count || this.state.defaultCount)}>Previous</Link>
                            </li>

                            {this.paginate()}

                            <li className="paginate_button next" aria-controls="datatable-sample" tabIndex="0" id="datatable-sample_next">
                                <Link to={'/searchresults?input=' + this.props.searchText + '&page=' + (this.props.page == this.state.pages ? this.state.pages : (this.props.page ? Number(this.props.page) : 1) + 1) + '&count=' + (this.props.count || this.state.defaultCount)}>Next</Link>
                            </li>
                            <li className="paginate_button last" aria-controls="datatable-sample" tabIndex="0" id="datatable-sample_last">
                                <Link to={'/searchresults?input=' + this.props.searchText + '&page=' + this.state.pages + '&count=' + (this.props.count || this.state.defaultCount)}>Last</Link>
                            </li>
                        </ul>
                    </div>

                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(SearchComponent);