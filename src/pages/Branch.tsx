
import React from "react";
import { Routes, Route } from "react-router-dom";
import BranchList from "@/components/branch/BranchList";
import BranchDetail from "@/components/branch/BranchDetail";
import BranchRevenue from "@/components/branch/BranchRevenue";
import BranchPerformance from "@/components/branch/BranchPerformance";
import BranchStaff from "@/components/branch/BranchStaff";
import BranchSettings from "@/components/branch/BranchSettings";
import BranchTargets from "@/components/branch/BranchTargets";
import BranchNetProfit from "@/components/branch/BranchNetProfit";
import BranchExpenses from "@/components/branch/BranchExpenses";
import BranchProductivity from "@/components/branch/BranchProductivity";
import BranchQueueAvg from "@/components/branch/BranchQueueAvg";
import BranchRecommendations from "@/components/branch/BranchRecommendations";

const Branch = () => {
  return (
    <div className="space-y-6">
      <Routes>
        <Route index element={<BranchList />} />
        <Route path=":branchId" element={<BranchDetail />} />
        <Route path="revenue" element={<BranchRevenue />} />
        <Route path="performance" element={<BranchPerformance />} />
        <Route path="staff" element={<BranchStaff />} />
        <Route path="settings" element={<BranchSettings />} />
        <Route path="targets" element={<BranchTargets />} />
        <Route path="net-profit" element={<BranchNetProfit />} />
        <Route path="profit" element={<BranchNetProfit />} />
        <Route path="expenses" element={<BranchExpenses />} />
        <Route path="productivity" element={<BranchProductivity />} />
        <Route path="queue-avg" element={<BranchQueueAvg />} />
        <Route path="queue-average" element={<BranchQueueAvg />} />
        <Route path="recommendations" element={<BranchRecommendations />} />
      </Routes>
    </div>
  );
};

export default Branch;
