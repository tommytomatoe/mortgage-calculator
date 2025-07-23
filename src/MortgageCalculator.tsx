import { useState, useMemo, useEffect } from 'react';
import { Calculator, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

const MortgageCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(1750000);
  const [year1Principal, setYear1Principal] = useState(750000);
  const [selectedStrategy, setSelectedStrategy] = useState('7');
  const [useQuarterlyChunks, setUseQuarterlyChunks] = useState(true);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState(0);
  const [selectedDownPayments, setSelectedDownPayments] = useState(['20']);
  const [sortConfig, setSortConfig] = useState({ key: 'totalCost', direction: 'asc' });
  const [autoAdjustPayment, setAutoAdjustPayment] = useState(false);
  
  // Reset values when auto-adjust is toggled
  useEffect(() => {
    if (autoAdjustPayment) {
      setYear1Principal(0);
      setAdditionalMonthlyPayment(0);
      setUseQuarterlyChunks(false);
    }
  }, [autoAdjustPayment]);
  
  // Preloaded loan data
  const loans = [
    // A Loans
    { id: 1, lender: 'A', type: '30yr Fixed', rate: 6.500, downPct: 30, closingCosts: 25190, lenderFees: 1710, pointsFees: 110, thirdPartyFees: 9276, negotiableFees: 15804 },
    { id: 2, lender: 'A', type: '30yr Fixed', rate: 6.125, downPct: 20, closingCosts: 54779, lenderFees: 1710, pointsFees: 29330, thirdPartyFees: 9764, negotiableFees: 6743 },
    { id: 3, lender: 'A', type: '30yr Fixed', rate: 6.375, downPct: 20, closingCosts: 33987, lenderFees: 1710, pointsFees: 8442, thirdPartyFees: 9764, negotiableFees: 6100 },
    { id: 4, lender: 'A', type: '30yr Fixed', rate: 6.750, downPct: 20, closingCosts: 24694, lenderFees: 1710, pointsFees: 0, thirdPartyFees: 9770, negotiableFees: 6124 },
    { id: 5, lender: 'A', type: '10/6 ARM SOFR', rate: 6.500, downPct: 20, closingCosts: 39453, lenderFees: 1710, pointsFees: 8681, thirdPartyFees: 9764, negotiableFees: 6148 },
    
    // S Loans
    { id: 6, lender: 'S', type: '30yr Fixed', rate: 6.750, downPct: 30, closingCosts: 22022, lenderFees: 1250, pointsFees: 0, thirdPartyFees: 15553, negotiableFees: 5519 },
    { id: 7, lender: 'S', type: '30yr Fixed', rate: 6.250, downPct: 20, closingCosts: 48386, lenderFees: 1250, pointsFees: 24500, thirdPartyFees: 17416, negotiableFees: 5520 },
    { id: 8, lender: 'S', type: '30yr Fixed', rate: 6.500, downPct: 20, closingCosts: 37982, lenderFees: 1250, pointsFees: 14000, thirdPartyFees: 17088, negotiableFees: 5944 },
    { id: 9, lender: 'S', type: '30yr Fixed', rate: 6.750, downPct: 25, closingCosts: 25756, lenderFees: 1250, pointsFees: 1641, thirdPartyFees: 17221, negotiableFees: 5944 },
    { id: 10, lender: 'S', type: '15yr Fixed', rate: 5.875, downPct: 20, closingCosts: 49992, lenderFees: 1250, pointsFees: 26250, thirdPartyFees: 17423, negotiableFees: 5369 },
    { id: 11, lender: 'S', type: '15yr Fixed', rate: 6.000, downPct: 20, closingCosts: 43040, lenderFees: 1250, pointsFees: 19250, thirdPartyFees: 17471, negotiableFees: 5369 },
    { id: 12, lender: 'S', type: '15yr Fixed', rate: 6.375, downPct: 20, closingCosts: 20434, lenderFees: 1250, pointsFees: 0, thirdPartyFees: 17615, negotiableFees: 1869 },
    { id: 18, lender: 'S', type: '15yr Fixed', rate: 6.250, downPct: 20, closingCosts: 23791, lenderFees: 1250, pointsFees: 0, thirdPartyFees: 17615, negotiableFees: 1869 },
    { id: 19, lender: 'S', type: '15yr Fixed', rate: 6.125, downPct: 20, closingCosts: 27293, lenderFees: 1250, pointsFees: 3500, thirdPartyFees: 17615, negotiableFees: 1869 },
    { id: 13, lender: 'S', type: '7/6 ARM', rate: 6.375, downPct: 20, closingCosts: 27434, lenderFees: 1250, pointsFees: 3500, thirdPartyFees: 17615, negotiableFees: 5369 },
    { id: 14, lender: 'S', type: '7/6 ARM', rate: 6.500, downPct: 20, closingCosts: 23982, lenderFees: 1250, pointsFees: 0, thirdPartyFees: 17663, negotiableFees: 5369 },
    { id: 15, lender: 'S', type: '5/6 ARM', rate: 5.375, downPct: 20, closingCosts: 51550, lenderFees: 1250, pointsFees: 28000, thirdPartyFees: 17231, negotiableFees: 5369 },
    { id: 16, lender: 'S', type: '5/6 ARM', rate: 5.500, downPct: 20, closingCosts: 46348, lenderFees: 1250, pointsFees: 22750, thirdPartyFees: 17279, negotiableFees: 5369 },
    { id: 17, lender: 'S', type: '5/6 ARM', rate: 5.750, downPct: 20, closingCosts: 39444, lenderFees: 1250, pointsFees: 15750, thirdPartyFees: 17375, negotiableFees: 5369 },
    
    // M Loans
    { id: 18, lender: 'M', type: '30yr ARM', rate: 6.125, downPct: 10, closingCosts: 21965, lenderFees: 1195, pointsFees: 0, thirdPartyFees: 16431, negotiableFees: 4339 },
    { id: 19, lender: 'M', type: '30yr ARM (10%+10%)', rate: 6.125, downPct: 10, closingCosts: 21965, lenderFees: 1195, pointsFees: 0, thirdPartyFees: 16431, negotiableFees: 4339, extra10Pct: true },
    { id: 20, lender: 'M', type: '30yr ARM', rate: 6.125, downPct: 20, closingCosts: 21965, lenderFees: 1195, pointsFees: 0, thirdPartyFees: 16431, negotiableFees: 4339 },
  ];

  // Calculate loan details
  const calculateLoan = (loan: any, strategy: string) => {
    const downPayment = purchasePrice * (loan.downPct / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = loan.rate / 100 / 12;
    const totalMonths = loan.type.includes('15yr') ? 180 : 360;
    // Calculate base monthly payment - using actual loan term
    const baseMonthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    
    // Calculate what payment would be needed for exact target payoff
    const targetPayoffMonths = parseInt(strategy) * 12;
    const exactPaymentNeeded = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -targetPayoffMonths));
    
    // If auto-adjust is enabled, calculate as if we're making equal payments
    if (autoAdjustPayment && strategy !== '30') {
      const totalInterest = exactPaymentNeeded * targetPayoffMonths - loanAmount;
      const totalCost = totalInterest + loan.closingCosts;
      const totalPaid = purchasePrice + totalCost;
      
      // Calculate points break-even
      let pointsBreakEven = null;
      if (loan.pointsFees > 0) {
        const comparableLoan = loans.find(l => 
          l.lender === loan.lender && 
          l.type === loan.type && 
          l.downPct === loan.downPct && 
          l.pointsFees === 0
        );
        
        if (comparableLoan) {
          const comparableRate = comparableLoan.rate / 100 / 12;
          const comparablePayment = (loanAmount * comparableRate) / (1 - Math.pow(1 + comparableRate, -totalMonths));
          const monthlySavings = comparablePayment - baseMonthlyPayment;
          
          if (monthlySavings > 0) {
            pointsBreakEven = Math.ceil(loan.pointsFees / monthlySavings);
          }
        }
      }
      
      return {
        ...loan,
        downPayment,
        loanAmount,
        monthlyPayment: baseMonthlyPayment,
        additionalMonthly: Math.round(exactPaymentNeeded - baseMonthlyPayment),
        requiredExtraMonthly: 0,
        totalMonthlyNeeded: Math.round(exactPaymentNeeded),
        totalInterest: Math.round(totalInterest),
        quarterlyChunk: 0,
        totalCost: Math.round(totalCost),
        totalPaid: Math.round(totalPaid),
        costToClose: Math.round(downPayment + loan.closingCosts),
        closingCosts: loan.closingCosts,
        lenderFees: loan.lenderFees,
        pointsFees: loan.pointsFees,
        thirdPartyFees: loan.thirdPartyFees,
        negotiableFees: loan.negotiableFees,
        actualPayoffMonth: targetPayoffMonths,
        actualPayoffYears: (targetPayoffMonths / 12).toFixed(1),
        pointsBreakEven: pointsBreakEven,
        exactPaymentNeeded: Math.round(exactPaymentNeeded),
        exactPaymentDiff: Math.round(exactPaymentNeeded - baseMonthlyPayment),
      };
    }
    
    
    // Calculate based on strategy
    if (strategy === '30') {
      // Full term calculation
      const totalPayments = baseMonthlyPayment * totalMonths + additionalMonthlyPayment * totalMonths;
      const totalInterest = totalPayments - loanAmount;
      const totalCost = totalInterest + loan.closingCosts;
      const totalPaid = purchasePrice + totalCost;
      
      // Calculate points break-even for 30-year strategy
      let pointsBreakEven = null;
      if (loan.pointsFees > 0) {
        const comparableLoan = loans.find(l => 
          l.lender === loan.lender && 
          l.type === loan.type && 
          l.downPct === loan.downPct && 
          l.pointsFees === 0
        );
        
        if (comparableLoan) {
          const comparableRate = comparableLoan.rate / 100 / 12;
          const comparablePayment = (loanAmount * comparableRate) / (1 - Math.pow(1 + comparableRate, -totalMonths));
          const monthlySavings = comparablePayment - baseMonthlyPayment;
          
          if (monthlySavings > 0) {
            pointsBreakEven = Math.ceil(loan.pointsFees / monthlySavings);
          }
        }
      }
      
      return {
        ...loan,
        downPayment,
        loanAmount,
        monthlyPayment: baseMonthlyPayment,
        additionalMonthly: additionalMonthlyPayment,
        requiredExtraMonthly: 0,
        totalMonthlyNeeded: baseMonthlyPayment + additionalMonthlyPayment,
        totalInterest: Math.round(totalInterest),
        quarterlyChunk: 0,
        totalCost: Math.round(totalCost),
        totalPaid: Math.round(totalPaid),
        costToClose: Math.round(downPayment + loan.closingCosts),
        closingCosts: loan.closingCosts,
        lenderFees: loan.lenderFees,
        pointsFees: loan.pointsFees,
        thirdPartyFees: loan.thirdPartyFees,
        negotiableFees: loan.negotiableFees,
        pointsBreakEven: pointsBreakEven,
        exactPaymentNeeded: Math.round(exactPaymentNeeded),
        exactPaymentDiff: Math.round(exactPaymentNeeded - baseMonthlyPayment),
      };
    }
    
    // Accelerated payoff calculation
    let balance = loanAmount;
    let totalInterest = 0;
    const targetMonths = parseInt(strategy) * 12;
    let actualPayoffMonth = 0;
    
    // Year 1 calculation with monthly extra payments
    for (let month = 1; month <= 12; month++) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      const principalFromPayment = baseMonthlyPayment - interest + additionalMonthlyPayment;
      balance -= principalFromPayment;
      if (balance <= 0 && actualPayoffMonth === 0) {
        actualPayoffMonth = month;
      }
    }
    
    // Apply Year 1 bulk principal payment
    balance -= year1Principal;
    
    // If balance is negative or zero, loan is paid off
    if (balance <= 0 && actualPayoffMonth === 0) {
      actualPayoffMonth = 12;
      const totalCost = totalInterest + loan.closingCosts;
      
      // Calculate points break-even for early payoff
      let pointsBreakEven = null;
      if (loan.pointsFees > 0) {
        const comparableLoan = loans.find(l => 
          l.lender === loan.lender && 
          l.type === loan.type && 
          l.downPct === loan.downPct && 
          l.pointsFees === 0
        );
        
        if (comparableLoan) {
          const comparableRate = comparableLoan.rate / 100 / 12;
          const comparablePayment = (loanAmount * comparableRate) / (1 - Math.pow(1 + comparableRate, -totalMonths));
          const monthlySavings = comparablePayment - baseMonthlyPayment;
          
          if (monthlySavings > 0) {
            pointsBreakEven = Math.ceil(loan.pointsFees / monthlySavings);
          }
        }
      }
      
      return {
        ...loan,
        downPayment,
        loanAmount,
        monthlyPayment: baseMonthlyPayment,
        additionalMonthly: additionalMonthlyPayment,
        requiredExtraMonthly: 0,
        totalMonthlyNeeded: baseMonthlyPayment + additionalMonthlyPayment,
        totalInterest: Math.round(totalInterest),
        quarterlyChunk: 0,
        totalCost: Math.round(totalCost),
        totalPaid: Math.round(purchasePrice + totalCost),
        costToClose: Math.round(downPayment + loan.closingCosts),
        closingCosts: loan.closingCosts,
        lenderFees: loan.lenderFees,
        pointsFees: loan.pointsFees,
        thirdPartyFees: loan.thirdPartyFees,
        negotiableFees: loan.negotiableFees,
        actualPayoffMonth: actualPayoffMonth,
        actualPayoffYears: (actualPayoffMonth / 12).toFixed(1),
        pointsBreakEven: pointsBreakEven,
        exactPaymentNeeded: Math.round(exactPaymentNeeded),
        exactPaymentDiff: Math.round(exactPaymentNeeded - baseMonthlyPayment),
      };
    }
    
    // Calculate remaining payments
    const monthsRemaining = targetMonths - 12;
    let quarterlyChunk = 0;
    let requiredExtraMonthly = 0;
    
    
    if (useQuarterlyChunks && monthsRemaining > 0) {
      // Calculate quarterly chunks to pay off in remaining time
      const quartersRemaining = Math.floor(monthsRemaining / 3);
      if (quartersRemaining > 0) {
        // Account for additional monthly payments during remaining period
        const additionalPrincipalFromMonthly = additionalMonthlyPayment * monthsRemaining;
        const remainingBalanceForChunks = balance - additionalPrincipalFromMonthly;
        
        if (remainingBalanceForChunks > 0) {
          const quarterlyRate = loan.rate / 100 / 4;
          quarterlyChunk = (remainingBalanceForChunks * quarterlyRate) / (1 - Math.pow(1 + quarterlyRate, -quartersRemaining));
        }
      }
    } else if (!useQuarterlyChunks && monthsRemaining > 0 && balance > 0) {
      // Force calculation if balance remains
      const requiredTotal = (balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -monthsRemaining));
      requiredExtraMonthly = requiredTotal - baseMonthlyPayment - additionalMonthlyPayment;
      
      // Even if negative, we want to track this for display purposes
      if (requiredExtraMonthly < 0) {
        requiredExtraMonthly = 0;
      }
    }
    
    // Estimate total interest for remaining period and actual payoff
    if (useQuarterlyChunks) {
      // Simulate payments with quarterly chunks
      let tempBalance = balance;
      let monthCounter = 12;
      
      while (tempBalance > 0 && monthCounter < targetMonths) {
        monthCounter++;
        const interest = tempBalance * monthlyRate;
        totalInterest += interest;
        let principal = baseMonthlyPayment - interest + additionalMonthlyPayment;
        
        // Add quarterly chunk every 3 months
        if ((monthCounter - 12) % 3 === 1) {
          principal += quarterlyChunk;
        }
        
        tempBalance -= principal;
        
        if (tempBalance <= 0 && actualPayoffMonth === 0) {
          actualPayoffMonth = monthCounter;
        }
      }
      
      if (actualPayoffMonth === 0 && tempBalance <= 0) {
        actualPayoffMonth = monthCounter;
      }
    } else {
      // More accurate interest calculation for monthly-only payments
      let tempBalance = balance;
      const totalMonthlyPayment = baseMonthlyPayment + additionalMonthlyPayment + requiredExtraMonthly;
      
      
      for (let month = 13; month <= Math.min(targetMonths, totalMonths); month++) {
        if (tempBalance <= 0) {
          if (actualPayoffMonth === 0) {
            actualPayoffMonth = month - 1;
          }
          break;
        }
        const interest = tempBalance * monthlyRate;
        totalInterest += interest;
        const principal = totalMonthlyPayment - interest;
        tempBalance -= principal;
      }
      
      if (actualPayoffMonth === 0 && tempBalance <= 0) {
        actualPayoffMonth = Math.min(targetMonths, totalMonths);
      }
    }
    
    // If we haven't found actual payoff month, set it to target
    if (actualPayoffMonth === 0) {
      actualPayoffMonth = targetMonths;
    }
    
    const totalCost = totalInterest + loan.closingCosts;
    const totalPaid = purchasePrice + totalCost;
    const costToClose = downPayment + loan.closingCosts;
    
    // Calculate points break-even
    let pointsBreakEven = null;
    if (loan.pointsFees > 0) {
      // Find a comparable loan from the same lender with no points
      const comparableLoan = loans.find(l => 
        l.lender === loan.lender && 
        l.type === loan.type && 
        l.downPct === loan.downPct && 
        l.pointsFees === 0
      );
      
      if (comparableLoan) {
        const comparableRate = comparableLoan.rate / 100 / 12;
        const comparablePayment = (loanAmount * comparableRate) / (1 - Math.pow(1 + comparableRate, -totalMonths));
        const monthlySavings = comparablePayment - baseMonthlyPayment;
        
        if (monthlySavings > 0) {
          pointsBreakEven = Math.ceil(loan.pointsFees / monthlySavings);
        }
      }
    }
    
    return {
      ...loan,
      downPayment,
      loanAmount,
      monthlyPayment: baseMonthlyPayment,
      additionalMonthly: additionalMonthlyPayment,
      requiredExtraMonthly: Math.round(requiredExtraMonthly),
      totalMonthlyNeeded: Math.round(baseMonthlyPayment + additionalMonthlyPayment + requiredExtraMonthly),
      totalInterest: Math.round(totalInterest),
      quarterlyChunk: Math.round(quarterlyChunk),
      totalCost: Math.round(totalCost),
      totalPaid: Math.round(totalPaid),
      costToClose: Math.round(costToClose),
      closingCosts: loan.closingCosts,
      lenderFees: loan.lenderFees,
      pointsFees: loan.pointsFees,
      thirdPartyFees: loan.thirdPartyFees,
      negotiableFees: loan.negotiableFees,
      actualPayoffMonth: actualPayoffMonth,
      actualPayoffYears: (actualPayoffMonth / 12).toFixed(1),
      pointsBreakEven: pointsBreakEven,
      exactPaymentNeeded: Math.round(exactPaymentNeeded),
      exactPaymentDiff: Math.round(exactPaymentNeeded - baseMonthlyPayment),
    };
  };

  const calculatedLoans = useMemo(() => {
    // Filter loans based on down payment preference
    const filteredLoans = selectedDownPayments.includes('all') 
      ? loans 
      : loans.filter(loan => selectedDownPayments.some(dp => loan.downPct === Number(dp)));
    const results = filteredLoans.map(loan => calculateLoan(loan, selectedStrategy));
    
    // Find winner based on total cost
    const costSortedResults = [...results].sort((a, b) => a.totalCost - b.totalCost);
    const winner = costSortedResults[0];
    
    // Add metadata
    const loansWithMetadata = results.map(loan => ({
      ...loan,
      vsWinner: loan.totalCost - winner.totalCost,
      rank: costSortedResults.findIndex(l => l.id === loan.id) + 1,
    }));
    
    // Apply sorting
    const sorted = [...loansWithMetadata].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }, [selectedStrategy, year1Principal, useQuarterlyChunks, additionalMonthlyPayment, selectedDownPayments, loans, calculateLoan, sortConfig, autoAdjustPayment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return `${rate.toFixed(3)}%`;
  };
  
  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => {
    const isSorted = sortConfig.key === column;
    const isAsc = sortConfig.direction === 'asc';
    
    return (
      <th 
        className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => handleSort(column)}
      >
        <div className="flex items-center space-x-1">
          <span>{children}</span>
          <span className="text-gray-400">
            {!isSorted && <ArrowUpDown className="w-3 h-3" />}
            {isSorted && isAsc && <ChevronUp className="w-3 h-3 text-blue-600" />}
            {isSorted && !isAsc && <ChevronDown className="w-3 h-3 text-blue-600" />}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div className="w-full max-w-full p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8" />
          Mortgage Comparison Calculator
        </h1>
        <p className="text-gray-600">
          Comparing {calculatedLoans.length} loan options {!selectedDownPayments.includes('all') && selectedDownPayments.length > 0 && `(${selectedDownPayments.sort((a, b) => Number(a) - Number(b)).join('%, ')}% down)`} with customizable payment strategies
          {autoAdjustPayment && (
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Equal Monthly Payments
            </span>
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Loan Parameters</h2>
        
        {/* Primary Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                step="10000"
              />
            </div>
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payoff Strategy</label>
            <select 
              value={selectedStrategy} 
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="7">7 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="30">Full Term (30 Years)</option>
            </select>
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Year 1 Principal Payment</label>
            <select
              value={year1Principal}
              onChange={(e) => setYear1Principal(Number(e.target.value))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={autoAdjustPayment}
            >
              {Array.from({ length: 41 }, (_, i) => i * 50000).map(value => (
                <option key={value} value={value}>
                  ${value.toLocaleString()}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">In addition to down payment</p>
          </div>
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Monthly Payment</label>
            <select
              value={additionalMonthlyPayment}
              onChange={(e) => setAdditionalMonthlyPayment(Number(e.target.value))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={autoAdjustPayment}
            >
              {[
                0, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
                6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000,
                19000, 20000, 25000, 30000, 35000, 40000, 45000, 50000
              ].map(value => (
                <option key={value} value={value}>
                  ${value.toLocaleString()}
                </option>
              ))}
            </select>
            {autoAdjustPayment && (
              <p className="mt-1 text-xs text-gray-500">Auto-calculated for equal payments</p>
            )}
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Down Payment Options</label>
              <div className="flex flex-wrap gap-3">
                {['10', '20', '25', '30', 'all'].map(value => (
                  <label key={value} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedDownPayments.includes(value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDownPayments([...selectedDownPayments, value]);
                        } else {
                          setSelectedDownPayments(selectedDownPayments.filter(dp => dp !== value));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {value === 'all' ? 'All' : `${value}%`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={autoAdjustPayment}
                  onChange={(e) => setAutoAdjustPayment(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Auto-adjust for equal monthly payments
                </span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={useQuarterlyChunks}
                  onChange={(e) => setUseQuarterlyChunks(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={selectedStrategy === '30' || autoAdjustPayment}
                />
                <span className="text-sm font-medium text-gray-700">
                  Use Quarterly Chunks (Years 2+)
                </span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Best Option Display */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-800">Best Option:</span>
            <span className="text-lg font-bold text-green-900">
              {calculatedLoans[0]?.lender} {calculatedLoans[0]?.type} @ {calculatedLoans[0]?.rate?.toFixed(3)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto relative">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>
          <table className="w-full min-w-[1800px]">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <SortableHeader column="rank">Rank</SortableHeader>
                <SortableHeader column="type">Loan Option</SortableHeader>
                <SortableHeader column="lender">Lender</SortableHeader>
                <SortableHeader column="rate">Rate</SortableHeader>
                <SortableHeader column="downPct">Down</SortableHeader>
                <SortableHeader column="totalMonthlyNeeded">
                  Monthly{!useQuarterlyChunks && selectedStrategy !== '30' && ' Total'}
                  {autoAdjustPayment && <span className="text-blue-600"> (Equal)</span>}
                </SortableHeader>
                {(additionalMonthlyPayment > 0 || autoAdjustPayment) && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">+Extra</th>
                )}
                {!useQuarterlyChunks && selectedStrategy !== '30' && !autoAdjustPayment && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Required Extra</th>
                )}
                <SortableHeader column="quarterlyChunk">Quarterly</SortableHeader>
                <SortableHeader column="actualPayoffYears">Actual Payoff</SortableHeader>
                <SortableHeader column="totalInterest">Total Interest</SortableHeader>
                <SortableHeader column="totalCost">Total Cost</SortableHeader>
                <SortableHeader column="vsWinner">vs Best</SortableHeader>
                <SortableHeader column="costToClose">Cost to Close</SortableHeader>
                <SortableHeader column="closingCosts">Closing Cost</SortableHeader>
                <SortableHeader column="lenderFees">Lender Fees</SortableHeader>
                <SortableHeader column="pointsFees">Points</SortableHeader>
                <SortableHeader column="pointsBreakEven">Points Break Even</SortableHeader>
                <SortableHeader column="thirdPartyFees">Third Party</SortableHeader>
                <SortableHeader column="negotiableFees">Negotiable</SortableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calculatedLoans.map((loan, index) => (
                <tr key={loan.id} className={index === 0 ? 'bg-green-50' : index < 5 ? 'bg-blue-50' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-green-600 text-white' : 
                      index < 3 ? 'bg-blue-600 text-white' : 
                      'bg-gray-300 text-gray-700'
                    }`}>
                      {loan.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {loan.type} {loan.downPct}%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{loan.lender}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatPercent(loan.rate)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.downPayment)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {autoAdjustPayment && selectedStrategy !== '30' ? (
                      <div>
                        <div className="font-semibold">{formatCurrency(loan.totalMonthlyNeeded)}</div>
                        <div className="text-xs text-gray-500">Base: {formatCurrency(loan.monthlyPayment)}</div>
                      </div>
                    ) : !useQuarterlyChunks && selectedStrategy !== '30' ? (
                      loan.requiredExtraMonthly > 0 ? (
                        <div>
                          <div className="font-semibold">{formatCurrency(loan.totalMonthlyNeeded)}</div>
                          <div className="text-xs text-gray-500">Base: {formatCurrency(loan.monthlyPayment)}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-green-600">{formatCurrency(loan.monthlyPayment)}</div>
                          <div className="text-xs text-gray-500">Sufficient</div>
                        </div>
                      )
                    ) : (
                      formatCurrency(loan.monthlyPayment)
                    )}
                  </td>
                  {(additionalMonthlyPayment > 0 || autoAdjustPayment) && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">+{formatCurrency(loan.additionalMonthly)}</td>
                  )}
                  {!useQuarterlyChunks && selectedStrategy !== '30' && !autoAdjustPayment && (
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {loan.requiredExtraMonthly > 0 ? (
                        formatCurrency(loan.requiredExtraMonthly)
                      ) : (
                        <span className="text-green-600 font-medium">None needed</span>
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {selectedStrategy !== '30' && useQuarterlyChunks ? formatCurrency(loan.quarterlyChunk) : 'N/A'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {loan.actualPayoffMonth < (loan.type.includes('15yr') ? 180 : 360) ? (
                      <span className="text-green-600 font-semibold">{loan.actualPayoffYears} years</span>
                    ) : (
                      <span className="text-gray-700">{loan.actualPayoffYears} years</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.totalInterest)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(loan.totalCost)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {loan.vsWinner > 0 && (
                      <span className="text-red-600">+{formatCurrency(loan.vsWinner)}</span>
                    )}
                    {loan.vsWinner === 0 && (
                      <span className="text-green-600 font-semibold">Best</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.costToClose)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.closingCosts)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.lenderFees)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.pointsFees)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {loan.pointsBreakEven ? (
                      <span className={loan.pointsBreakEven > parseInt(selectedStrategy) * 12 ? "text-red-600" : "text-green-600"}>
                        {Math.floor(loan.pointsBreakEven / 12)}y {loan.pointsBreakEven % 12}m
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.thirdPartyFees)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatCurrency(loan.negotiableFees)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Payment Strategy:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Year 1 Principal: {formatCurrency(year1Principal)} (spread quarterly)</li>
            {additionalMonthlyPayment > 0 && (
              <li>• Additional Monthly: {formatCurrency(additionalMonthlyPayment)} applied to principal</li>
            )}
            {useQuarterlyChunks && selectedStrategy !== '30' && (
              <li>• Quarterly Chunks: Applied in Years 2+ to achieve {selectedStrategy}-year payoff</li>
            )}
            {!useQuarterlyChunks && selectedStrategy !== '30' && (
              <li>• No Quarterly Chunks: Monthly payment must increase to hit {selectedStrategy}-year target</li>
            )}
            {!useQuarterlyChunks && selectedStrategy !== '30' && (
              <li>• Required Extra Monthly = Additional payment needed beyond base + your extra</li>
            )}
            {!useQuarterlyChunks && selectedStrategy !== '30' && (
              <li>• 15-year loans may already have sufficient monthly payments after Year 1 principal</li>
            )}
            {!useQuarterlyChunks && selectedStrategy !== '30' && calculatedLoans[0]?.requiredExtraMonthly > 0 && (
              <li className="font-semibold text-blue-900">• Top loan needs: {formatCurrency(calculatedLoans[0]?.totalMonthlyNeeded)}/month total to hit target</li>
            )}
            {selectedStrategy !== '30' && calculatedLoans.some(loan => loan.actualPayoffMonth < parseInt(selectedStrategy) * 12) && (
              <li className="font-semibold text-green-700">• Green "Actual Payoff" = Pays off earlier than {selectedStrategy}-year target with current inputs!</li>
            )}
            <li>• "10%+10%" option assumes additional 10% payment in month 6</li>
            <li>• Green = Winner | Blue = Top 5 | Gray = Others</li>
            <li>• Green text in "Actual Payoff" = Pays off earlier than target</li>
            <li>• Scroll horizontally to see all closing cost details →</li>
          </ul>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">Column Explanations:</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• <strong>Actual Payoff</strong>: When loan actually pays off with your inputs</li>
            <li>• <strong>Cost to Close</strong>: Down payment + all closing costs</li>
            <li>• <strong>Closing Cost</strong>: Total fees at closing</li>
            <li>• <strong>Lender Fees</strong>: Origination, processing, underwriting</li>
            <li>• <strong>Points</strong>: Discount points to lower rate</li>
            <li>• <strong>Points Break Even</strong>: Time to recoup points cost (red if longer than payoff)</li>
            <li>• <strong>Third Party</strong>: Title, appraisal, recording fees</li>
            <li>• <strong>Negotiable</strong>: Fees you might negotiate away</li>
          </ul>
          {!selectedDownPayments.includes('all') && selectedDownPayments.length > 0 && (
            <p className="mt-3 text-sm text-amber-900">📌 <strong>Note</strong>: Showing only {selectedDownPayments.sort((a, b) => Number(a) - Number(b)).join('%, ')}% down options</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;