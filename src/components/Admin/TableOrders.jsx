function TableOrders(props) {
    let rows = props.data;

    return (
        <>
            {rows = undefined || '' ? <>سفارشی وجود ندارد</> :
                <table className="border border-black w-full">
                    <tbody>
                    <tr>
                        <th className="border border-black">نام </th>
                        <th className="border border-black">نام خانوادگی</th>
                        <th className="border border-black">آدرس</th>
                        <th className="border border-black">جزییات سفارش</th>
                    </tr>
                    {rows.map((item,i)=>(
                    <tr key={i}>
                        <td className="border border-black">{item.customerDetail.firstName}</td>
                        <td className="border border-black">{item.customerDetail.lastName}</td>
                        <td className="border border-black">{item.customerDetail.address}</td>
                        <td className="border border-black">مودال جزییات </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            } 
        </>
    )
}
export default TableOrders