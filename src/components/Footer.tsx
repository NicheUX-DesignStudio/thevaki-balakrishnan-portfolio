import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="w-full py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
    >
      <div className="text-xs text-muted-foreground/50 font-mono uppercase tracking-[0.2em]">
        <p>© {currentYear} · The Arconia Archive</p>
        <p className="mt-2 text-[10px] text-muted-foreground/30">
          UI/UX Design
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;