

export const timeAgo=(isoDatetime: string): string=> {
    const currentDate = new Date();
    const inputDate = new Date(isoDatetime);
    const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    }
  
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minutes ago`;
    }
  
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    if (timeDifferenceInHours < 24) {
      return `${timeDifferenceInHours} hours ago`;
    }
  
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    if (timeDifferenceInDays < 30) {
      return `${timeDifferenceInDays} days ago`;
    }
  
    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
    if (timeDifferenceInMonths < 12) {
      return `${timeDifferenceInMonths} months ago`;
    }
  
    const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);
    return `${timeDifferenceInYears} years ago`;
  }

export const formatAmount=(amount:number)=> {
    // Use toLocaleString to format the amount with commas as thousands separators and 4 decimal places
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }

export const calculateProfitOrLoss=(
    position: string,
    unitPurchasePrice: number,
    currentSellingPrice: number,
    units: number
  ): number =>{
    if (position === 'S') {
      // Short position: Profit/Loss = (Unit Purchase Price - Current Selling Price) * Units
      return (unitPurchasePrice - currentSellingPrice) * units;
    } else if (position === 'B') {
      // Long position: Profit/Loss = (Current Selling Price - Unit Purchase Price) * Units
      return (currentSellingPrice - unitPurchasePrice) * units;
    } else {
      // Invalid position, return 0
      return 0;
    }
  }