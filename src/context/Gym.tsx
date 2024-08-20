import React, { createContext, useContext, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useGyms } from '@/hooks/';

interface GymNameContextProps {
  gymName: string;
  loading: boolean;
}

const GymNameContext = createContext<GymNameContextProps>({ gymName: '', loading: true });

export const GymNameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { gymId } = useParams<{ gymId: string }>();
  const { gyms, loading } = useGyms();

  const gym = gyms.find(gym => gym.id === gymId);
  const gymName = gym ? gym.name : 'STEEL';
  console.log(gymId, gymName)

  return (
    <GymNameContext.Provider value={{ gymName, loading }}>
      {children}
    </GymNameContext.Provider>
  );
};

export const useGymNameContext = () => useContext(GymNameContext);
