import authRouters from '@/modules/auth/router/routers';
import landingRouters from '@/modules/landing/router/routers';
import commonRouters from '@/modules/common/router/routers';

export const routers = [...authRouters, ...commonRouters, ...landingRouters];
