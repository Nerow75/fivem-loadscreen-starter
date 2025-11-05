-- client.lua (loading screen)

CreateThread(function()
  while true do
    -- Récupérer le nombre de joueurs
    local playerCount = GetNumPlayerIndices()

    SendLoadingScreenMessage(json.encode({
      playerCount = playerCount
    }))

    Wait(2000)
  end
end)

-- Fermer le loading screen quand le joueur spawn
AddEventHandler('playerSpawned', function()
  ShutdownLoadingScreen()
end)