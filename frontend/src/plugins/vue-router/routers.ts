import authRouters from '@/modules/auth/router/routers';
import homeRouters from '@/modules/homepage/router/routers';
import commonRouters from '@/modules/common/router/routers';

export const routers = [...authRouters, ...commonRouters, ...homeRouters];
