import type { User } from '../types'

export type { User } from '../types'

export const users: User[] = [
  { id: '1',  name: 'Ana Costa',        email: 'ana.costa@devportal.com',        role: 'Admin',     status: 'active',   squad: 'Platform',  avatar: 'AC', joinedAt: '2023-01-15' },
  { id: '2',  name: 'Bruno Lima',       email: 'bruno.lima@devportal.com',       role: 'Developer', status: 'active',   squad: 'Dashboard', avatar: 'BL', joinedAt: '2023-03-20' },
  { id: '3',  name: 'Carla Mendes',     email: 'carla.mendes@devportal.com',     role: 'Designer',  status: 'active',   squad: 'UX',        avatar: 'CM', joinedAt: '2023-02-10' },
  { id: '4',  name: 'Diego Rocha',      email: 'diego.rocha@devportal.com',      role: 'Developer', status: 'inactive', squad: 'Users',     avatar: 'DR', joinedAt: '2022-11-05' },
  { id: '5',  name: 'Elena Souza',      email: 'elena.souza@devportal.com',      role: 'QA',        status: 'active',   squad: 'Platform',  avatar: 'ES', joinedAt: '2023-04-18' },
  { id: '6',  name: 'Felipe Torres',    email: 'felipe.torres@devportal.com',    role: 'Developer', status: 'active',   squad: 'Dashboard', avatar: 'FT', joinedAt: '2023-05-22' },
  { id: '7',  name: 'Gabriela Nunes',   email: 'gabriela.nunes@devportal.com',   role: 'Admin',     status: 'active',   squad: 'Platform',  avatar: 'GN', joinedAt: '2022-09-14' },
  { id: '8',  name: 'Henrique Alves',   email: 'henrique.alves@devportal.com',   role: 'Developer', status: 'inactive', squad: 'Reports',   avatar: 'HA', joinedAt: '2023-01-30' },
  { id: '9',  name: 'Isabela Ferreira', email: 'isabela.ferreira@devportal.com', role: 'Designer',  status: 'active',   squad: 'UX',        avatar: 'IF', joinedAt: '2023-06-05' },
  { id: '10', name: 'João Barbosa',     email: 'joao.barbosa@devportal.com',     role: 'Developer', status: 'active',   squad: 'Dashboard', avatar: 'JB', joinedAt: '2023-07-12' },
  { id: '11', name: 'Karen Oliveira',   email: 'karen.oliveira@devportal.com',   role: 'QA',        status: 'active',   squad: 'Reports',   avatar: 'KO', joinedAt: '2023-08-01' },
  { id: '12', name: 'Lucas Martins',    email: 'lucas.martins@devportal.com',    role: 'Developer', status: 'inactive', squad: 'Users',     avatar: 'LM', joinedAt: '2022-12-20' },
  { id: '13', name: 'Mariana Dias',     email: 'mariana.dias@devportal.com',     role: 'Admin',     status: 'active',   squad: 'Platform',  avatar: 'MD', joinedAt: '2022-08-10' },
  { id: '14', name: 'Nathan Cardoso',   email: 'nathan.cardoso@devportal.com',   role: 'Developer', status: 'active',   squad: 'Dashboard', avatar: 'NC', joinedAt: '2023-09-03' },
  { id: '15', name: 'Paula Ribeiro',    email: 'paula.ribeiro@devportal.com',    role: 'Designer',  status: 'active',   squad: 'UX',        avatar: 'PR', joinedAt: '2023-10-15' },
]
