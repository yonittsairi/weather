export const UtilsService = {
    fernhietToCelcuis,
    dateFormatter,
    dateFormat
};


export function fernhietToCelcuis(fernhiet){
    return ((fernhiet-32)/1.8).toFixed(0)
}

function dateFormatter(timeStampStart) {
    const dateFormat = new Date(timeStampStart).toString()
    // const dateEndFormat = new Date(timeStampEnd).toString()
    const dayName = dateFormat.substring(0, 3)
    const month = dateFormat.substring(4, 8)
    const dayNum = dateFormat.substring(8, 10)
    const time = dateFormat.substring(15, 21)
    // const timeEnd = dateEndFormat.substring(15, 21)
    return (
        <section>
            <b> {dayName + ', ' + month + dayNum}</b>
            {/* <div>{time + ' - ' + timeEnd}</div> */}
        </section>
    )
}

export function dateFormat (timeStampStart) {
    if (!timeStampStart){
        return ''
    }
    let newTimeStamp = timeStampStart?.replace ("Z", "");
    let dateFormat = new Date (newTimeStamp);
    let d = dateFormat.getDate ();
    let m = dateFormat.getMonth () + 1;
    const y = dateFormat.getFullYear ();
    let hh = dateFormat.getHours ();
    let mm = dateFormat.getMinutes ();
    d = d < 10 ? "0" + d : d;
    m = m < 10 ? "0" + m : m;
    mm = mm < 10 ? "0" + mm : mm;
    hh = hh < 10 ? "0" + hh : hh;

    return d + "/" + m + "/" + y
}
