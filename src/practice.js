class CusLink extends React.Component{
    render(){
        return(
            <Route /*(1)*/ path={this.props.to} 
                   /*(2)*/ children={props=>{
                                console.log(props.match)
                                //(3)
                                return(
                                    <li>
                                        {props.match ? ">" : ""}
                                        <Link to={this.props.to}>{this.props.name}</Link>
                                    </li>)
            }} />
        )
    }
}