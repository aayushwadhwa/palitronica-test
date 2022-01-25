import React from "react";
import { connect } from "react-redux";
import { fetchItems, calculate, resetState } from "../actions";

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quantity: {}, customerId: "1" }
    }
    componentDidMount() {
        this.props.fetchItems();
        if (this.props.items && this.props.items.length) {
            let item_state = {}
            this.props.items.map(item => {
                item_state[item.id] = "";
            })
            this.setState(item_state)
            console.log("State::", this.state)
        }
    }

    handleChange = (e, id) => {
        let quantity = this.state.quantity
        quantity[id] = e.target.value
        this.setState({ ...this.state, "quantity": quantity })
    }
    handleCustomerChange = (e) => {
        this.setState({ ...this.state, "customerId": e.target.value })
    }
    populateItems = () => {
        return this.props.items.map(item => (
            <div className="row" key={item.id}>
                <div className="col-2 text-center">{item.id}</div>
                <div className="col-10"><input type="number" value={this.state.quantity[item.id] ? this.state.quantity[item.id] : ""}
                    onChange={(e) => this.handleChange(e, item.id)} /></div>
            </div>
        ))
    }

    calculate = () => {
        this.props.resetState()
        let req = { "customer_id": this.state.customerId, items: [] }
        if (this.state.quantity) {
            for (let id in this.state.quantity) {
                if (this.state.quantity[id]) {
                    let item = {
                        "id": id,
                        "quantity": this.state.quantity[id]
                    }
                    req.items.push(item)
                }
            }
        }
        console.log(req)
        this.props.calculate(req);
    }

    render() {
        console.log(this.props)
        return <div>
            <div className="row"><div className="col-2 text-center">Customer Id:</div><div className="col-10">
                <input type="number" value={this.state.customerId}
                    onChange={(e) => this.handleCustomerChange(e)} />
            </div></div>
            <div className="row"><div className="col-2 text-center">Item Id:</div><div className="col-10">Quantity</div></div>
            {this.populateItems()}
            <button className="mt-4" onClick={() => this.calculate()}>Calcuate Amount</button>
            {this.props.errorMessage ? <p className="text-danger"> {this.props.errorMessage} </p>:null}
            {
                this.props.calcuatedData ? <div className="row mt-4">
                    <table>
                        <tr><td className="pr-2"><b>Name:</b></td><td><b>{this.props.calcuatedData.customer.customer_name}</b></td></tr>
                        <tr><td className="pr-2"><b>Item Id</b></td><td><b>Price</b></td></tr>
                        {
                            this.props.calcuatedData.items.map(item => <tr><td className="pr-2"><b>{item.id}</b></td><td>${item.price}</td></tr>)
                        }
                        <tr><td className="pr-2"><b>Amount (before tax)</b></td><td>${this.props.calcuatedData.amount_before_tax}</td></tr>
                        <tr><td className="pr-2"><b>Tax</b></td><td>${this.props.calcuatedData.tax}</td></tr>
                        <tr><td className="pr-2"><b>Final Amount</b></td><td>${this.props.calcuatedData.amount_after_tax}</td></tr>
                    </table>
                </div> : null 
            }
        </div>
    }
}

const mapStateToProps = state => {
    console.log("Updated State", state);
    return { items: state.items, calcuatedData: state.calcuatedData, errorMessage: state.errorMessage };
}

export default connect(mapStateToProps, { fetchItems, calculate, resetState })(Items)