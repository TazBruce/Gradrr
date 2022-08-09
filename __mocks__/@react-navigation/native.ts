export const mockGoBack = jest.fn();
export const mockNavigate = jest.fn();

export const useNavigation = () => ({
  goBack: mockGoBack,
  navigate: mockNavigate,
});
