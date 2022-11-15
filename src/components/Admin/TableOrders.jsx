function TableOrders(props) {
    let rows = props.row;

    return (
        <>
            {rows = undefined || '' ? <>سفارشی وجود ندارد</> :
                <table>
                    <tr>
                        <th>نام </th>
                        <th>نام خانوادگی</th>
                        <th>آدرس</th>
                        <th>جزییات سفارش</th>
                    </tr>
                    <tr>
                    {rows.map((item,i)=>(
                        <>
                        <td key={i}>{item.customerDetail.firstName}</td>
                        <td >{item.customerDetail.lastName}</td>
                        <td >{item.customerDetail.address}</td>
                        <td>مودال جزییات </td>
                        </> 
                    ))}
                    </tr>
                </table>
            } 
        </>
    )
}
export default TableOrders