import { SnapshotDTO } from "../dtos/Snapshot.dto";
import { SnapshotModel } from "../models/Snapshot/Snapshot.model";

class Service {
  async getAllForWallet(walletId: string): Promise<SnapshotDTO[]> {
    const snapshots = await SnapshotModel.findByWallet(walletId);
    const viewSnapshots = snapshots.map((snap) => new SnapshotDTO(snap));
    return viewSnapshots;
  }
}

export const SnapshotService = new Service();
