const routes = {
    Home: {path: "/", name: "Home"},
    // Admin Only Routes
    AdminDashboard: {path: "/admin", name: "Admin Dashboard"},
    AdminGames: {path: '/admin/games', name: "Admin Games"},
    AdminGameDetail: {path: "/admin/games/:game_id", name: "Admin Game Detail"},
    AdminLevelEditor: {path: "/admin/level-editor/:level_id"},
}

export default routes;