import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: number;
  icon: IconType;
  trend?: { value: number; isPositive: boolean };
  color?: 'primary' | 'accent' | 'success' | 'warning';
  delay?: number;
}

const colorVariants = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'bg-primary/20 text-primary',
    trend: 'text-primary',
  },
  accent: {
    bg: 'bg-accent/10',
    icon: 'bg-accent/20 text-accent',
    trend: 'text-accent',
  },
  success: {
    bg: 'bg-success/10',
    icon: 'bg-success/20 text-success',
    trend: 'text-success',
  },
  warning: {
    bg: 'bg-warning/10',
    icon: 'bg-warning/20 text-warning',
    trend: 'text-warning',
  },
};

export const StatsCard = ({ title, value, icon: Icon, trend, color = 'primary', delay = 0 }: StatsCardProps) => {
  const colors = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-secondary text-sm font-medium mb-1">{title}</p>
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
            className="text-3xl font-bold text-text"
          >
            {value.toLocaleString()}
          </motion.p>

          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-secondary">vs last month</span>
            </div>
          )}
        </div>

        <motion.div
          whileHover={{ rotate: 15 }}
          className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const AnimatedCounter = ({ value }: { value: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono"
    >
      {value.toLocaleString()}
    </motion.span>
  );
};
