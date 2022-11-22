function TableOrders(props) {
    let rows = props.row;

    return (
        <>
            {rows = undefined || '' ? <>سفارشی وجود ندارد</> :
                <table className="border border-black">
                    <tbody>
                    <tr>
                        <th>نام </th>
                        <th>نام خانوادگی</th>
                        <th>آدرس</th>
                        <th>جزییات سفارش</th>
                    </tr>
                    {rows.map((item,i)=>(
                    <tr>
                        <>
                        <td key={i} className="border border-black">{item.customerDetail.firstName}</td>
                        <td className="border border-black">{item.customerDetail.lastName}</td>
                        <td className="border border-black">{item.customerDetail.address}</td>
                        <td className="border border-black">مودال جزییات </td>
                        </> 
                    </tr>
                    ))}
                    </tbody>
                </table>
            } 
        </>
    )
}
export default TableOrders