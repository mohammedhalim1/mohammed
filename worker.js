onmessage = function(e) {
  const { principal, startDate } = e.data;
  let totalProfit = 0;
  let totalValue = principal;
  const calculationStartDate = new Date(startDate);
  calculationStartDate.setDate(calculationStartDate.getDate() + 1);
  const endDate = new Date(calculationStartDate);
  endDate.setMonth(endDate.getMonth() + 36);
  const monthlyResults = [];

  let currentDate = new Date(calculationStartDate);
  while (currentDate <= endDate) {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let daysToCompound = daysInMonth;
    if (currentDate.getTime() === calculationStartDate.getTime()) {
      daysToCompound = daysInMonth - currentDate.getDate() + 1;
    } else if (currentDate.getMonth() === endDate.getMonth() && currentDate.getFullYear() === endDate.getFullYear()) {
      daysToCompound = endDate.getDate() - currentDate.getDate() + 1;
    }

    const previousValue = totalValue;
    totalValue = totalValue * Math.pow(1 + 0.001, daysToCompound);
    const profit = totalValue - previousValue;
    totalProfit += profit;

    monthlyResults.push({
      month: currentDate.toLocaleString("default", { month: "short", year: "numeric" }),
      profit: profit.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      totalValue: totalValue.toFixed(2)
    });

    currentDate.setMonth(currentDate.getMonth() + 1, 1);
  }
  postMessage({ monthlyResults });
};