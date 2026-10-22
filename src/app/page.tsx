"use client";

import React, { useState } from "react";
import { Sidebar, PartnerNavTab, MasterNavTab } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { HomeView } from "@/components/HomeView";
import { DealsView } from "@/components/DealsView";
import { CommissionsView } from "@/components/CommissionsView";
import { ShareView } from "@/components/ShareView";
import { HeroPage } from "@/components/HeroPage";
import { ApplicationForm } from "@/components/ApplicationForm";
import { SettingsView } from "@/components/SettingsView";
import { MasterOverviewView } from "@/components/MasterOverviewView";
import { MasterPartnersView } from "@/components/MasterPartnersView";
import { MasterPipelineView } from "@/components/MasterPipelineView";
import { MasterCommissionsView } from "@/components/MasterCommissionsView";
import { MasterReportsView } from "@/components/MasterReportsView";
import { ShareReferralModal } from "@/components/ShareReferralModal";
import { DealDetailModal } from "@/components/DealDetailModal";
import { AddPartnerModal } from "@/components/AddPartnerModal";
import { Check, X } from "lucide-react";
import { 
  INITIAL_DEALS, 
  INITIAL_PARTNER, 
  Deal, 
  PartnerProfile 
} from "@/data/mockData";
import { PartnerDeal } from "@/data/netlifyData";

export default function App() {
  const [perspective, setPerspective] = useState<'partner' | 'master'>('partner');
  const [currentPartnerTab, setCurrentPartnerTab] = useState<PartnerNavTab>('home');
  const [currentMasterTab, setCurrentMasterTab] = useState<MasterNavTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sub-routes for Hero page & Application form flow
  const [activeFlow, setActiveFlow] = useState<'dashboard' | 'hero-page' | 'apply-form'>('dashboard');

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null);

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Core state
  const [partner, setPartner] = useState<PartnerProfile>(INITIAL_PARTNER);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);

  const togglePerspective = () => {
    if (perspective === 'partner') {
      setPerspective('master');
      setToastMessage({
        title: "Kredo Master view",
        subtitle: "You can now see every partner book.",
      });
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setPerspective('partner');
      setToastMessage({
        title: "Partner Workspace view",
        subtitle: "Viewing as Hayes Partners.",
      });
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleAddNewDeal = (newDeal: Deal) => {
    setDeals([newDeal, ...deals]);
  };

  const handlePartnerDealSelect = (pDeal: PartnerDeal) => {
    const matchingDeal = deals.find(d => d.id === pDeal.id) || {
      id: pDeal.id,
      name: pDeal.name,
      applicant: "Client Representative",
      amount: pDeal.facility || pDeal.amountBand,
      type: "Commercial Facility",
      status: pDeal.stage as Deal['status'],
      lastActivity: pDeal.submitted,
      commission: pDeal.commission,
      commissionStatus: 'Confirmed',
      code: "HAYES01",
      submittedDate: pDeal.submitted,
    };
    setSelectedDeal(matchingDeal);
  };

  const handleUpdateDealStatus = (dealId: string, newStatus: Deal['status']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, status: newStatus } : d))
    );
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal({ ...selectedDeal, status: newStatus });
    }
  };

  // If user navigated to the client Hero Page
  if (activeFlow === 'hero-page') {
    return (
      <HeroPage
        onBackToDemo={() => setActiveFlow('dashboard')}
        onApplyNow={() => setActiveFlow('apply-form')}
      />
    );
  }

  // If user navigated to the Apply Now Application Form
  if (activeFlow === 'apply-form') {
    return (
      <ApplicationForm
        onBackToDemo={() => setActiveFlow('dashboard')}
        referralCode="SPUD"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-3 bg-[#062615] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#0d4f2c] max-w-sm animate-in slide-in-from-top-2 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-white leading-tight">{toastMessage.title}</div>
            <div className="text-[11px] text-emerald-300 mt-0.5">{toastMessage.subtitle}</div>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Responsive Sidebar */}
      <Sidebar
        perspective={perspective}
        currentPartnerTab={currentPartnerTab}
        currentMasterTab={currentMasterTab}
        onSelectPartnerTab={(tab) => {
          if (tab === 'hero') {
            setActiveFlow('hero-page');
          } else {
            setCurrentPartnerTab(tab);
          }
        }}
        onSelectMasterTab={(tab) => {
          if (tab === 'hero') {
            setActiveFlow('hero-page');
          } else {
            setCurrentMasterTab(tab);
          }
        }}
        onTogglePerspective={togglePerspective}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        {/* Top Header */}
        <Header
          partnerName={partner.name}
          perspective={perspective}
          onTogglePerspective={togglePerspective}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          unreadCount={2}
        />

        {/* View Switcher Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto pb-16">
          {/* PARTNER PERSPECTIVE VIEWS */}
          {perspective === 'partner' && (
            <>
              {currentPartnerTab === 'home' && (
                <HomeView
                  deals={deals}
                  onOpenShareModal={() => setCurrentPartnerTab('share')}
                  onSelectDeal={(deal) => setSelectedDeal(deal)}
                  onNavigateToDeals={() => setCurrentPartnerTab('deals')}
                  onNavigateToCommissions={() => setCurrentPartnerTab('commissions')}
                  onNavigateToShare={() => setCurrentPartnerTab('share')}
                  partnerCode={partner.code}
                  referralLink={partner.referralLink}
                />
              )}

              {currentPartnerTab === 'deals' && (
                <DealsView
                  onSelectDeal={handlePartnerDealSelect}
                />
              )}

              {currentPartnerTab === 'commissions' && (
                <CommissionsView />
              )}

              {currentPartnerTab === 'share' && (
                <ShareView
                  onOpenHeroDemo={() => setActiveFlow('hero-page')}
                />
              )}

              {currentPartnerTab === 'settings' && (
                <SettingsView
                  partner={partner}
                  onUpdatePartner={(updated) => setPartner(updated)}
                />
              )}
            </>
          )}

          {/* MASTER PERSPECTIVE VIEWS */}
          {perspective === 'master' && (
            <>
              {currentMasterTab === 'overview' && (
                <MasterOverviewView
                  onNavigateToPartners={() => setCurrentMasterTab('partners')}
                  onNavigateToPipeline={() => setCurrentMasterTab('pipeline')}
                />
              )}

              {currentMasterTab === 'partners' && (
                <MasterPartnersView
                  onOpenAddPartner={() => setIsAddPartnerOpen(true)}
                />
              )}

              {currentMasterTab === 'pipeline' && (
                <MasterPipelineView />
              )}

              {currentMasterTab === 'commissions' && (
                <MasterCommissionsView />
              )}

              {currentMasterTab === 'reports' && (
                <MasterReportsView />
              )}

              {currentMasterTab === 'settings' && (
                <SettingsView
                  partner={partner}
                  onUpdatePartner={(updated) => setPartner(updated)}
                />
              )}
            </>
          )}
        </main>

      </div>

      {/* Modals */}
      <ShareReferralModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        referralCode={partner.code}
        referralLink={partner.referralLink}
        onAddDeal={handleAddNewDeal}
      />

      <DealDetailModal
        deal={selectedDeal}
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        onUpdateStatus={handleUpdateDealStatus}
      />

      <AddPartnerModal
        isOpen={isAddPartnerOpen}
        onClose={() => setIsAddPartnerOpen(false)}
        onAddPartner={(p) => {
          setToastMessage({
            title: `Partner ${p.tradingName} created`,
            subtitle: `Assigned code: ${p.uniqueCode}`,
          });
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />
    </div>
  );
}
