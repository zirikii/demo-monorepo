declare module "*.json" {
  const value: Array<{
    email: string;
    name: string;
    role: string;
    hub: string;
    team: string;
  }>;
  export default value;
}
