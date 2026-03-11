import { ChevronRight } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { colors } from '../../styles/colors';

function TransactionItem({ avatar, name, date, amount, isPositive }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '12px 16px',
      backgroundColor: colors.brightwhite,
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div style={{ 
          backgroundColor: colors.springgreen, 
          color: colors.black, 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '14px', 
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ 
            fontSize: '16px', 
            color: colors.black, 
            fontWeight: 500,
            marginBottom: '2px',
          }}>
            {name}
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: colors.textSecondary, 
            fontWeight: 400,
          }}>
            {date}
          </div>
        </div>
        <div style={{ 
          fontSize: '16px', 
          color: isPositive ? colors.springgreen : colors.black, 
          fontWeight: 600,
        }}>
          {amount}
        </div>
      </div>
    </div>
  );
}

export default function CashflowTab() {
  const chartData = [
    { month: 'Jan', inflow: 45000, outflow: 0, cumulative: 15000 },
    { month: 'Feb', inflow: 37000, outflow: 0, cumulative: 22000 },
    { month: 'Mar', inflow: 58000, outflow: 0, cumulative: 35000 },
    { month: 'Apr', inflow: 0, outflow: -38000, cumulative: 28000 },
    { month: 'May', inflow: 68000, outflow: 0, cumulative: 45000 },
    { month: 'Jun', inflow: 52000, outflow: 0, cumulative: 58000 },
    { month: 'Jul', inflow: 0, outflow: -32000, cumulative: 52000 },
    { month: 'Aug', inflow: 65000, outflow: 0, cumulative: 62000 },
    { month: 'Sep', inflow: 32000, outflow: 0, cumulative: 68000 },
    { month: 'Oct', inflow: 0, outflow: -52000, cumulative: 55000 },
    { month: 'Nov', inflow: 62000, outflow: 0, cumulative: 65000 },
    { month: 'Dec', inflow: 0, outflow: -45000, cumulative: 58000 }
  ];

  const transactions = [
    { avatar: "SN", name: "Supplier Name Ltd", date: "Thurs 7 Jan", amount: "£525.00", isPositive: false },
    { avatar: "AS", name: "Another Supplier", date: "Wed 6 Jan", amount: "£1,010.00", isPositive: false },
    { avatar: "I", name: "Invoice 104", date: "Sun 31 Dec", amount: "+£40,018.00", isPositive: true },
    { avatar: "SP", name: "Stationery Purchase", date: "Sun 31 Dec", amount: "+£310.00", isPositive: true }
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '24px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
            Net inflow vs outflow
          </h2>
          <ChevronRight size={20} style={{ color: colors.black }} />
        </div>
        
      </div>

      <div style={{ 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '24px', 
        height: '240px' 
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }} 
            barSize={18} 
            barGap={8}
          >
            <CartesianGrid strokeDasharray="0" stroke={colors.grey200} vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} hide={true} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: colors.textSecondary, fontSize: 12 }} 
              domain={[-50000, 75000]} 
              ticks={[-50000, -25000, 0, 25000, 50000, 75000]} 
              tickFormatter={(v) => v === 0 ? '0' : (v / 1000) + 'k'} 
            />
            <ReferenceLine y={0} stroke={colors.grey300} strokeWidth={2} />
            <Bar dataKey="inflow" fill={colors.springgreen} radius={[2, 2, 0, 0]} />
            <Bar dataKey="outflow" fill={colors.grey500} radius={[2, 2, 0, 0]} />
            <Line 
              type="basis" 
              dataKey="cumulative" 
              stroke={colors.aquamarine} 
              strokeWidth={3} 
              dot={false} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '24px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ 
            paddingLeft: '12px', 
            paddingRight: '12px', 
            paddingTop: '4px', 
            paddingBottom: '4px', 
            fontSize: '14px', 
            border: `1px solid ${colors.black}`, 
            color: colors.black, 
            backgroundColor: 'transparent', 
            borderRadius: '50px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}>
            1M
          </button>
          <button style={{ 
            paddingLeft: '12px', 
            paddingRight: '12px', 
            paddingTop: '4px', 
            paddingBottom: '4px', 
            fontSize: '14px', 
            backgroundColor: colors.black, 
            color: colors.brightwhite, 
            border: 'none', 
            borderRadius: '50px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}>
            1Y
          </button>
          <button style={{ 
            paddingLeft: '12px', 
            paddingRight: '12px', 
            paddingTop: '4px', 
            paddingBottom: '4px', 
            fontSize: '14px', 
            border: `1px solid ${colors.black}`, 
            color: colors.black, 
            backgroundColor: 'transparent', 
            borderRadius: '50px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}>
            3Y
          </button>
          <button style={{ 
            paddingLeft: '12px', 
            paddingRight: '12px', 
            paddingTop: '4px', 
            paddingBottom: '4px', 
            fontSize: '14px', 
            border: `1px solid ${colors.black}`, 
            color: colors.black, 
            backgroundColor: 'transparent', 
            borderRadius: '50px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}>
            YTD
          </button>
        </div>
        <button style={{ 
          paddingLeft: '12px', 
          paddingRight: '12px', 
          paddingTop: '4px', 
          paddingBottom: '4px', 
          fontSize: '14px', 
          border: `1px solid ${colors.black}`, 
          color: colors.black, 
          backgroundColor: 'transparent', 
          borderRadius: '50px', 
          fontWeight: 600, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          cursor: 'pointer' 
        }}>
          All <ChevronRight size={16} style={{ transform: 'rotate(90deg)' }} />
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '16px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '14px', color: colors.black, fontWeight: 600 }}>
            Recent transactions
          </h2>
          <ChevronRight size={20} style={{ color: colors.black }} />
        </div>
        
      </div>

      {transactions.map((transaction, idx) => (
        <TransactionItem key={idx} {...transaction} />
      ))}
    </div>
  );
}