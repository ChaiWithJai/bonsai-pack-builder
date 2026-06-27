export type StateOwner = 'address' | 'local' | 'draft' | 'server-cache' | 'derived';

export type Screen = {
  id: string;
  route: string;
  title: string;
  renders: string[];
  components: string[];
  state: Record<StateOwner, string[]>;
  gates: string[];
};

export type ServiceStatus = 'seeded' | 'designed' | 'mocked' | 'planned' | 'blocked';

export type Service = {
  id: string;
  name: string;
  runsWhere: string;
  status: ServiceStatus;
  responsibility: string;
  nextProof: string;
};

export type ReviewArtifact = {
  title: string;
  href: string;
  description: string;
};
